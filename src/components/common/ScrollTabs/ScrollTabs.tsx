'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import arrow_r_white from '@icon/arrow_right_white.svg'
import arrow_l_white from '@icon/arrow_left_white.svg'
import TabItem from './TabItem'
import { memberPath } from '@/definitions/pathMap'

interface ScrollTabsProps {}

const ScrollTabs: React.FC<ScrollTabsProps> = () => {
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

    const renderTabs = () => {
        return memberPath.map((item, i) => {
            const [path, title] = item
            return (
                <TabItem
                    key={path}
                    pageTitle={title}
                    path={path}
                    hasBorder={i !== memberPath.length - 1}
                />
            )
        })
    }
    return (
        <div className="relative overflow-hidden px-10 md:px-0">
            <ul
                className="scrollbar-hidden m-0 flex gap-6 overflow-x-scroll md:block"
                ref={scrollRef}
                style={{
                    scrollBehavior: 'smooth',
                }}>
                {renderTabs()}
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

export default ScrollTabs
