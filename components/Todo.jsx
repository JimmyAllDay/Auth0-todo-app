import React, { useContext, useState } from 'react';
import { TodosContext } from '@/context/TodosContext';
import { truncateString } from '@/utils/todos';
import LoadingBar from '@/components/LoadingBar';

export default function Todo({ todo }) {
  const { id } = todo;
  const { loadingStates, updateTodo, deleteTodo, refreshTodos } =
    useContext(TodosContext);

  const handleToggleCompleted = () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo, id);
  };

  const checkboxClasses =
    'w-5 h-5 mr-2 my-auto border border-neutral-500 rounded-sm checked:bg-violet-400 checked:text-black checked:border-violet-400 appearance-none bg-neutral-700';

  const buttonClasses =
    'text-sm bg-neutral-700 hover:bg-neutral-600 hover:bg-opacity-40 hover:text-red-400 text-neutral-400 py-1 px-1 rounded-tr rounded-br border-s border-neutral-500 w-[70px]';

  return (
    <li className="flex shadow-md rounded my-2 w-full bg-neutral-700 border border-neutral-500">
      <div className="flex w-full flex-col">
        <div className="flex w-full py-2 pl-2 text-neutral-400">
          <div
            className={`flex-1 text-sm ${
              todo?.fields?.completed
                ? 'line-through text-neutral-500 text-opacity-70'
                : ''
            }`}
          >
            {todo?.fields?.description === 'Loading...' ? (
              <div className="flex justify-center">
                <div className="h-4 bg-neutral-600 w-4/5"></div>
              </div>
            ) : (
              <p>{todo?.fields?.description}</p>
            )}
          </div>
          {todo?.fields?.description !== 'Loading...' && (
            <input
              type="checkbox"
              name={'check' + '-' + id}
              id={'check' + '-' + id}
              checked={todo?.fields?.completed || false}
              className={checkboxClasses}
              onChange={handleToggleCompleted}
            />
          )}
        </div>
        <div className="h-1">
          <LoadingBar loading={loadingStates(id)} />
        </div>
      </div>
      {todo?.fields?.description !== 'Loading...' && (
        <>
          <button
            type="button"
            className={buttonClasses}
            onClick={async () => {
              await deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
