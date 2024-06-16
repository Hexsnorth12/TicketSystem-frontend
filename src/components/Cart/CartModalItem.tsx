'use client'
import React from 'react'
import { CartItem } from '@/types/product'
import type { CartModalItem as Props } from '@/types'
import { cn } from '@/utils'
import Image from 'next/image'
import { useCartStore } from '../../stores/useCartStore'
import { FaTrashAlt } from 'react-icons/fa'
const CartModalItem: React.FC<Props> = ({ productInfo, className }) => {
    // const { img, name, type, amount } = productInfo
    console.log(productInfo, 'productInfosss')

    const productName = truncateCartProductName(productInfo.title, 10)
    function truncateCartProductName(
        name: string | undefined,
        length: number,
    ): string {
        if (typeof name !== 'string') {
            return '' // Handle undefined or non-string names gracefully
        }

        const truncatedName = name.slice(0, length)
        return name.length > length ? truncatedName + '...' : name
    }

    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const productDetail1: CartItem = {
        ...productInfo,
    }
    console.log(productDetail1, 'productDetail1')

    return (
        <div
            className={cn(
                'flex  gap-3 border-b border-b-gray-4 pb-3',
                className,
            )}>
            <div className="h-[74px] w-[68px] overflow-hidden rounded-lg">
                <Image
                    src={productInfo.photoPath}
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
                <p className="text-gray-5">{productInfo.quantity}</p>
                <p className="text-primary">
                    NT$ {productInfo.price * productInfo.selectedPlan.discount}
                </p>
                <p className="text-small2 text-gray-5">
                    {productInfo.selectedPlan.name}
                </p>
            </div>
            <button
                title="Remove Item"
                className="ml-4 text-red-500 hover:text-red-600"
                onClick={() =>
                    removeFromCart(productDetail1, productInfo.selectedPlan)
                }>
                <FaTrashAlt size={18} />
            </button>
        </div>
    )
}

export default CartModalItem
