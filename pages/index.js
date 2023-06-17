import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Todo from '@/components/Todo';
import LoadingTodo from '@/components/Todo';
import TodoForm from '@/components/TodoForm';
import { table, minifyRecords } from '@/pages/api/utils/airtable';
import { TodosContext } from '@/context/TodosContext';
import { useEffect, useContext } from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { orderTodos } from '@/utils/todos';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos, loadingStates } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="container border border-neutral-500 bg-neutral-700 rounded mx-auto my-10 max-w-xl p-2">
        <Navbar user={user} />
        <main className="flex min-h-screen flex-col items-center">
          <TodoForm user={user} />
          <ul className=" w-full">
            {todos &&
              orderTodos(todos).map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let todos = [];
  const session = await getSession(context.req, context.res);
  const user = session?.user;

  try {
    if (user) {
      todos = await table
        .select({
          filterByFormula: `userid = '${user.sub}'`,
        })
        .firstPage();
    }
    return {
      props: {
        user: user || null,
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (error) {
    console.error('An error occurred:', error);

    return {
      props: {
        user: null,
        initialTodos: [],
      },
    };
  }
}
