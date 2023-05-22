import '@/styles/globals.css';
import { TodosProvider } from '@/context/TodosContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <div className="container border border-gray-100 rounded mx-auto my-10 max-w-xl p-2">
          <Component {...pageProps} />
        </div>
      </TodosProvider>
    </UserProvider>
  );
}
