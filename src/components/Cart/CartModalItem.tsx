'use client'
import React from 'react'
import { ProductDetail, ProductPlan } from '@/types/product'
import type { CartModalItem as Props } from '@/types'
import { cn } from '@/utils'
import Image from 'next/image'
import { useCartStore } from '../../stores/useCartStore'
import { FaTrashAlt } from 'react-icons/fa'
const CartModalItem: React.FC<Props> = ({
    productInfo,
    className,
    totalItems,
}) => {
    // const { img, name, type, amount } = productInfo
    const productName = truncateCartProductName(productInfo.name, 10)

    function truncateCartProductName(name: string, length: number): string {
        const truncatedName = name.slice(0, length)
        return name.length > length ? truncatedName + '...' : name
    }

    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const productDetail1: ProductDetail = {
        ...productInfo,
        rank: 1,
        theater: 'Some Theater',
        startAt: '2024-06-10T12:00:00.000Z',
        endAt: '2024-06-10T14:00:00.000Z',
        notifications: [],
        highlights: [],
        introduction: 'Introduction',
        cautions: [],
        confirmations: [],
        cancelPolicies: [],
        certificates: [],
        plans: [],
        tags: [],
        brief: 'Brief',
    }
    return (
        <div
            className={cn(
                'flex  gap-3 border-b border-b-gray-4 pb-3',
                className,
            )}>
            <div className="h-[68px] w-[68px] overflow-hidden rounded-lg">
                <Image
                    src={productInfo.img}
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
                <p className="text-gray-5">{productInfo.type}</p>
                <p className="text-primary">NT$ {productInfo.price}</p>
            </div>
            <button
                title="Remove Item"
                className="ml-4 text-red-500 hover:text-red-600"
                onClick={() => removeFromCart(productDetail1)}>
                <FaTrashAlt size={18} />
            </button>
        </div>
    )
}

export default CartModalItem
