import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <div className="ms-auto flex space-x-2 me-2">
        <Link href="/api/logout">
          <div className="flex rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-[80px] justify-center">
            Logout
          </div>
        </Link>
        <Link href="/api/login">
          <div className="flex rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-[80px] justify-center">
            Login
          </div>
        </Link>
      </div>
    </nav>
  );
}