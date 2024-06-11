'use client'
import React from 'react'
import { Navigate } from '../Buttons'

import { cn } from '@/utils'

import type { CartModal as Props } from '@/types'
import CartModalItem from './CartModalItem'

export const CartModal: React.FC<Props> = ({
    visible,
    items,
    totalItems,
    total,
    leaveModalHandler,
}) => {
    console.log(items, 'items')

    function showModal() {
        return visible ? 'md:flex' : 'md:hidden'
    }

    function removeBorder(index: number) {
        const lastItem = index === items.length - 1
        return lastItem ? 'border-b-0' : ''
    }

    function getTotalQuantity() {
        return items.length
    }

    function getTotalAmnount() {
        return items.reduce((acc, item) => acc + item.amount, 0)
    }

    const visibility = showModal()
    const totalQuantity = getTotalQuantity()
    const totalAmount = getTotalAmnount()
    const containerStyle = cn(
        'absolute right-0 hidden w-[280px] flex-col',
        visibility,
    )

    return (
        <div className={containerStyle}>
            {/* 透明間距，讓滑鼠事件不會中斷*/}
            <div className="h-[35px] w-full bg-transparent" />

            <div className="cart-modal-container w-full rounded-lg bg-gray-3 p-3">
                <div className="mb-2 flex max-h-[400px] w-full flex-col gap-3 overflow-y-scroll overscroll-y-auto scrollbar-hidden">
                    {items.map((item, index) => {
                        const borderStyle = removeBorder(index)
                        return (
                            <CartModalItem
                                key={index}
                                productInfo={item}
                                totalItems={totalItems}
                                className={borderStyle}
                            />
                        )
                    })}
                </div>

                <div className="mb-3 flex w-full justify-between rounded-[4px] bg-gray-1 px-3 py-2 font-normal text-white">
                    <p>
                        總計 <span className="text-primary">{totalItems}</span>{' '}
                        項商品
                    </p>
                    <p>
                        NT${' '}
                        <span className="text-primary">{total.toFixed(2)}</span>
                    </p>
                </div>

                <Navigate
                    href="/cart"
                    onClick={leaveModalHandler}
                    buttonStyle="cart-nav-btn relative w-full py-2 justify-center bg-transparent text-center">
                    前往購物車
                </Navigate>
            </div>
        </div>
    )
}
