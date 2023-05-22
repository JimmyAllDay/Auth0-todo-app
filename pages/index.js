import Image from 'next/image';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Todo from '@/components/Todo';
import { table, minifyRecords } from '@/pages/api/utils/airtable';
import { TodosContext } from '@/context/TodosContext';
import { useEffect, useContext } from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos);
  });

  return (
    <div>
      <Head>
        <title>Auth0 Todo App</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Navbar user={user} />
      <main className="flex min-h-screen flex-col items-center">
        <ul className=" w-full">
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const todos = await table.select({}).firstPage();
      const session = await getSession(context.req, context.res);
      const serialisedSession = JSON.parse(JSON.stringify(session));
      return {
        props: {
          user: serialisedSession?.user || null,
          initialTodos: minifyRecords(todos),
        },
      };
    } catch (error) {
      console.error('An error occurred:', error);
      return {
        props: {
          session: null,
          initialTodos: [],
        },
      };
    }
  },
});
