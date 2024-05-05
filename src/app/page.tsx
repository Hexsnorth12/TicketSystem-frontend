'use client' // This is a client component 👈🏽
import React from 'react'
import Link from 'next/link'
import SearchForm from '@/components/forms/Search'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="">
        <h1 className="mt-10 text-center text-3xl font-bold">
          Welcome to my Next.js App!
        </h1>
        <p className="mt-4 flex text-center text-lg">
          This is a simple example page.
        </p>
        <Link href={'/login'}>LOGIN</Link>
      </div>
    </main>
  )
}
