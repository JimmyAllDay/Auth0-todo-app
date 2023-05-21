import Image from 'next/image';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Todo from '@/components/Todo';
import { table, minifyRecords } from '@/pages/api/utils/airtable';
import { TodosContext } from '@/context/TodosContext';
import { useEffect, useContext } from 'react';
export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos);
  });

  console.log(initialTodos);
  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        <ul className=" w-full">
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'Something went wrong',
      },
    };
  }
}
