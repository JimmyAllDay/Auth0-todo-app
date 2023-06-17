import '@/styles/globals.css';
import { TodosProvider } from '@/context/TodosContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <TodosProvider>
        <Component {...pageProps} />
      </TodosProvider>
    </UserProvider>
  );
}
