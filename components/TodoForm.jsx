import { TodosContext } from '@/context/TodosContext';
import React, { useState, useContext } from 'react';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== '') {
      addTodo(todo);
      setTodo('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a todo item');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="form flex flex-col w-full p-2 shadow-md rounded-lg my-2 py-2 px-4"
    >
      <div className="w-full flex">
        <input
          type="text"
          name="todo"
          id=""
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter new todo item"
          className="border border-gray-300 p-2 focus:outline-none focus:border-gray-400 w-full rounded-bl rounded-tl"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 rounded-tr rounded-br p-2 ms-auto text-white"
        >
          Submit
        </button>
      </div>
      {errorMessage && <p className="text-red-400 mx-auto">{errorMessage}</p>}
    </form>
  );
}
