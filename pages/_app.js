import '@/styles/globals.css';
import { TodosProvider } from '@/context/TodosContext';

export default function App({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container border border-gray-100 rounded mx-auto my-10 max-w-xl p-2">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}
