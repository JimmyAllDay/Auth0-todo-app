import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="container border border-gray-100 rounded mx-auto my-10 max-w-xl p-2">
      <Component {...pageProps} />
    </div>
  );
}
