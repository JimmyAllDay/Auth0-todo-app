import { TodosContext } from '@/context/TodosContext';
import React, { useState, useContext } from 'react';

export default function TodoForm({ user }) {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const checkUser = () => {
    if (!user) {
      setErrorMessage('Please log in to enter todos');
      setInputDisabled(true);
    } else {
      setErrorMessage('');
      setInputDisabled(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== '') {
      addTodo(todo);
      setTodo('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a todo item before clicking submit');
    }
  };

  const inputClasses = `border border-neutral-500 text-lg p-2 focus:outline outline-violet-500 focus:ring-violet-500 focus:bg-neutral-600 w-full rounded-bl rounded-tl bg-neutral-700 text-neutral-400 focus:text-neutral-300 ${
    isInputFocused && isButtonHovered
      ? 'outline outline-violet-600 border-violet-600'
      : ''
  }`;

  const buttonClasses = `rounded-tr rounded-br p-2 ms-auto text-white w-[90px] ${
    inputDisabled
      ? 'bg-neutral-600 outline-neutral-600'
      : 'bg-violet-500 hover:bg-violet-600'
  } `;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="form flex flex-col w-full shadow-md rounded-lg bg-neutral-700 mb-2"
      >
        <div className="w-full flex">
          <input
            type="text"
            name="todo"
            id=""
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onFocus={() => {
              checkUser();
              handleFocus();
            }}
            placeholder="Enter new todo item"
            disabled={inputDisabled}
            onBlur={handleBlur}
            className={inputClasses}
          />
          <button
            type="submit"
            className={buttonClasses}
            disabled={inputDisabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Submit
          </button>
        </div>
      </form>
      {errorMessage && <p className="text-red-400 mx-auto">{errorMessage}</p>}
    </>
  );
}
