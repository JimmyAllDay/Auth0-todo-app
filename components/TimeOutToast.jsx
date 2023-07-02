import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TimeOutToast({ toastHandler, timeHandler }) {
  const [timeOut, setTimeOut] = useState(30);
  const router = useRouter();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeOut((prevTimeOut) => prevTimeOut - 1);
    }, 1000);

    if (timeOut === 0) {
      clearInterval(countdown);
      router.push('/api/auth/logout');
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timeOut]);

  return (
    <div className="bg-neutral-800 border border-white text-white flex flex-col rounded mx-auto w-max py-4 px-20 items-center space-y-6">
      You are about to be logged out. Do you wish to continue?
      <div className="flex space-x-4 mt-4 justify-center">
        <Link href="/api/auth/login">
          <button
            className="flex rounded bg-violet-400 hover:bg-opacity-90 text-white py-2 px-4 w-[80px] justify-center"
            onClick={() => {
              toastHandler(false);
              timeHandler(10000);
            }}
          >
            Yes
          </button>
        </Link>
        <Link href="/api/auth/logout">
          <button className="flex rounded bg-teal-400 hover:bg-opacity-90 text-white py-2 px-4 w-[80px] justify-center">
            No
          </button>
        </Link>
      </div>
      <p className="me-auto">{timeOut}</p>
    </div>
  );
}
