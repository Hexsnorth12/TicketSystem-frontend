'use client'
import React from 'react'

import type { CartModalItem as Props } from '@/types'
import { cn } from '@/utils'
import Image from 'next/image'

const CartModalItem: React.FC<Props> = ({ productInfo, className }) => {
    const { img, name, type, amount } = productInfo
    const productName = truncateCartProductName(name, 10)

    function truncateCartProductName(name: string, length: number): string {
        const truncatedName = name.slice(0, length)
        return name.length > length ? truncatedName + '...' : name
    }

    return (
        <div
            className={cn(
                'flex  gap-3 border-b border-b-gray-4 pb-3',
                className,
            )}>
            <div className="h-[68px] w-[68px] overflow-hidden rounded-lg">
                <Image
                    src={img}
                    alt="cart product img"
                    width={68}
                    height={68}
                    style={{
                        backgroundColor: '#EAEAEA',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <p className="text-white">{productName}</p>
                <p className="text-gray-5">{type}</p>
                <p className="text-primary">NT$ {amount}</p>
            </div>
        </div>
    )
}

export default CartModalItem
