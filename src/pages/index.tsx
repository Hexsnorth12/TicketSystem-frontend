// pages/index.tsx
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App with Vite and Tailwind CSS</title>
        <meta name="description" content="Your description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-center mt-10">Welcome to my Next.js App!</h1>
        <p className="text-lg text-center mt-4">This is a simple example page.</p>
      </main>
    </div>
  )
}
