import React, { useContext } from 'react';
import { TodosContext } from '@/context/TodosContext';

export default function Todo({ todo }) {
  const { updateTodo, deleteTodo, refreshTodos } = useContext(TodosContext);

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo);
  };

  return (
    <li className="bg-white flex shadow-md rounded-lg my-2 py-2 px-4 w-full">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={todo?.fields?.completed || false}
        className="mr-2 h-5 form-checkbox checked:bg-blue-500"
        onChange={handleToggleCompleted}
      />
      <p
        className={`flex-1 text-gray-800 ${
          todo?.fields?.completed ? 'line-through' : ''
        }`}
      >
        {todo?.fields?.description}
      </p>
      <button
        type="button"
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
        onClick={async () => {
          await deleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
