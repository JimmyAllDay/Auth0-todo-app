import { createContext, useState, useEffect } from 'react';
import { getCurrentTime } from '@/utils/todos';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loadingStates, setLoadingStates] = useState({ placeholder: true });

  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (description) => {
    try {
      setTodos((prevTodos) => {
        const placeholderTodo = {
          id: 'placeholder',
          fields: {
            description: 'Loading...',
            completed: false,
            timeCreated: getCurrentTime(),
          },
        };
        return [placeholderTodo, ...prevTodos];
      });
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === 'placeholder') {
            return newTodo;
          }
          return todo;
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo, componentId) => {
    try {
      setLoadingStates((prevState) => ({
        ...prevState,
        [componentId]: true,
      }));
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updatedTodo }),
      });
      await res.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [componentId]: false,
      }));
    }
  };

  const deleteTodo = async (id) => {
    try {
      setLoadingStates((prevState) => ({
        ...prevState,
        [id]: true,
      }));

      await fetch(`/api/deleteTodo/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStates((prevState) => {
        const { id, ...newState } = prevState;
        return newState;
      });
    }
  };

  const contextValue = {
    loadingStates: (componentId) => loadingStates[componentId] || false,
    todos,
    setTodos,
    refreshTodos,
    updateTodo,
    deleteTodo,
    addTodo,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
