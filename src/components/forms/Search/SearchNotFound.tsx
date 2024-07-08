'use client' // This is a client component 👈🏽
import React, { useState, useEffect } from 'react'
import { Popcards } from '../../../definitions/marqueeData'
import Image from 'next/image'
import { Input } from '@components/common'
import { SearchBtn } from '@/components/Buttons'
import { Modal } from '@components/common'
import { SearchForm } from '@components/forms'
import Link from 'next/link'

type Popcard = {
    image: string
    name: string
}

function shuffleArray(array: Popcard[]): Popcard[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export default function SearchResult() {
    const [search, setSearch] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [shuffledPopcards, setShuffledPopcards] = useState<Popcard[]>([])

    useEffect(() => {
        setShuffledPopcards(shuffleArray([...Popcards]))
    }, [])

    const handleSearchChange = (value: string) => {
        setSearch(value)
    }
    const handleFilterClick = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <div className="relative  h-screen w-screen">
                {shuffledPopcards.map((popcard, index) => (
                    <div key={index}>
                        <div className="h-full w-full">
                            <Image
                                fill
                                objectFit="cover"
                                src={popcard.image}
                                alt={popcard.name}
                                className="grayscale filter"
                            />
                        </div>
                    </div>
                ))}
                <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
                    <div className="flex flex-col items-center md:space-y-4">
                        <div className="flex flex-col ">
                            <div className="text-btn2 text-primary md:mb-3 md:text-header3">
                                哎哎呀！找不到你的搜尋結果...我是沒有商品的哦
                            </div>
                            <div className="flex flex-row  gap-x-2 font-sans font-bold text-white md:gap-x-4 md:text-header5">
                                請重新篩選搜尋條件！
                            </div>
                        </div>

                        <div className=" pointer-events-auto relative top-1 order-first order-last mt-6">
                            <div className="relative shadow-sm">
                                <Input
                                    type="text"
                                    rounded="full"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="輸入關鍵字"
                                    className="h-12 w-[360px] py-5 md:h-16 md:w-[526px]"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center gap-1 p-2">
                                    <SearchBtn
                                        type="filter"
                                        onClick={handleFilterClick}
                                    />
                                    <SearchBtn type="recommend" />
                                    <Link href="/search">
                                        <SearchBtn
                                            type="search"
                                            active={true}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {isModalOpen && (
                            <Modal onClose={handleModalClose}>
                                <div className="mx-auto overflow-auto border-0 bg-gray-2 p-4">
                                    <SearchForm />
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
