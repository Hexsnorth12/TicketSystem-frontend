'use client'
import React from 'react'

const Loading = () => {
    return (
        <div className="bg-background relative flex min-h-screen items-center justify-center">
            <div className="loader text-loader relative h-12 w-64 text-center font-bold uppercase leading-[3rem] tracking-widest">
                Loading...
                <div className="before:bg-loader before:animate-load before:absolute before:top-0 before:block before:h-8 before:w-4 before:content-['']"></div>
                <div className="after:bg-loader after:animate-load after:absolute after:bottom-0 after:block after:h-8 after:w-4 after:content-['']"></div>
            </div>
        </div>
    )
}

export default Loading
