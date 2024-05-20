'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import arrow from '@icon/arrow_right_primary.svg'
import arrow_r_white from '@icon/arrow_right_white.svg'
import arrow_l_white from '@icon/arrow_left_white.svg'

interface ScrollbarProps {}

const Scrollbar: React.FC<ScrollbarProps> = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [scrollDistance, setScrollDistance] = useState(0)
    const [maxScrollPosition, setMaxScrollPosition] = useState(0)
    const scrollRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        const calculateScrollValues = () => {
            const windowWidth = window.innerWidth
            const scrollDistanceValue = windowWidth <= 768 ? 150 : 0
            const scrollWidth = scrollRef.current?.scrollWidth || 0
            const client = scrollRef.current?.clientWidth || 0
            const maxScrollPositionValue = scrollWidth - client

            setScrollDistance(scrollDistanceValue)
            setMaxScrollPosition(maxScrollPositionValue)
        }

        calculateScrollValues()

        const handleResize = () => {
            calculateScrollValues()
            setScrollPosition(0)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleScroll = (activePosition: number) => {
        if (!scrollRef.current) return

        const currentPosition = scrollPosition + activePosition
        if (currentPosition <= 0) {
            scrollRef.current.scrollLeft = 0
            setScrollPosition(0)
            return
        } else if (currentPosition >= maxScrollPosition) {
            scrollRef.current.scrollLeft = maxScrollPosition
            setScrollPosition(maxScrollPosition)
            return
        }

        scrollRef.current.scrollLeft = currentPosition
        setScrollPosition(currentPosition)
    }

    return (
        <div className="relative overflow-hidden px-10 md:px-0">
            <ul
                className="scrollbar-hidden m-0 flex gap-6 overflow-x-scroll md:block"
                ref={scrollRef}
                style={{
                    scrollBehavior: 'smooth',
                }}>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <Link
                        href={'/user/info'}
                        className="text-nowrap text-small2 md:text-btn2">
                        會員資料
                    </Link>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <Link
                        href={'/user/tickets'}
                        className="text-nowrap text-small2 md:text-btn2">
                        我的電影票
                    </Link>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <p className="text-nowrap text-small2 md:text-btn2">
                        我的收藏
                    </p>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <p className="text-nowrap text-small2 md:text-btn2">
                        我的評論
                    </p>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <p className="text-nowrap text-small2 md:text-btn2">
                        線上分票
                    </p>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
                <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                    <p className="text-nowrap text-small2 md:text-btn2">
                        我的揪團
                    </p>
                    <Image
                        src={arrow}
                        width={24}
                        height={24}
                        className="hidden md:block"
                        alt="navigation to user info"
                    />
                </li>
            </ul>
            <button
                className={clsx('absolute -top-0.5 left-0 md:hidden', {
                    hidden: scrollPosition === 0,
                })}
                onClick={() => handleScroll(-scrollDistance)}>
                <Image
                    src={arrow_l_white}
                    width={24}
                    height={24}
                    alt={'right'}
                />
            </button>
            <button
                className={clsx('absolute -top-0.5 right-0 z-50 md:hidden', {
                    hidden: scrollPosition >= maxScrollPosition,
                })}
                onClick={() => handleScroll(scrollDistance)}>
                <Image
                    src={arrow_r_white}
                    width={24}
                    height={24}
                    alt={'right'}
                />
            </button>
        </div>
    )
}

export default Scrollbar
