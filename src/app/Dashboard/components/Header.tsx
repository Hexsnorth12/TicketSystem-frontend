// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="">
            <Image src="/Movie go.png" alt="My App Logo" width={180} height={60} />
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link href="/movies">
            <p className="text-white">電影總表</p>
          </Link>
          <Link href="/gatherings">
            <p className="text-white">一起揪團</p>
          </Link>
          <Link href="/login">
            <div className="inline-block border rounded-full px-4 py-2" style={{ borderColor: "#00FFFF" }}>
              <p className="text-white">會員登入</p>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;