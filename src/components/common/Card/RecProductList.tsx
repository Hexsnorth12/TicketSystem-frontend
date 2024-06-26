// /components/ProductList.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TypeTag } from '@/components/Buttons'
import Tag from '@components/common/Tag/tag'
import { Button } from '@/components/common'
import {
    truncateName,
    truncateContentMobile,
    truncateBrief,
} from '../../../utils/numberUtils'
import { FaMapMarkerAlt } from 'react-icons/fa'
// Favorite Section

import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'

type Tag = {
    tagId: string
}
type Product = {
    _id: string
    title: string
    type: string
    genre: string
    theater: string
    brief: string
    vendor: string
    price: number
    amount: number
    soldAmount: number
    isLaunched: boolean
    isPublic: boolean
    recommendWeight: number
    sellEndAt: string
    sellStartAt: string
    endAt: string
    startAt: string
    tags: Tag[]
    photoPath: string
    isFavorite: boolean
}
type RecProductListProps = {
    products: Product[]
    favorites: Record<string, boolean>
    onUpdateFavorite: (productId: string) => void
}

const RecProductList: React.FC<RecProductListProps> = ({
    products,
    favorites,
    onUpdateFavorite,
}) => {
    const router = useRouter()

    const handleMovieDetail = (id: string) => {
        router.push(`/movies/${id}`)
    }

    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:grid md:grid-cols-5 md:grid-rows-2 md:gap-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="md:mb-10"
                        onClick={() => handleMovieDetail(product._id)}
                        style={{ cursor: 'pointer' }}>
                        <Link href="">
                            <div className="relative min-h-[210px]">
                                <Image
                                    src={product.photoPath}
                                    alt={product.title}
                                    objectFit="cover"
                                    width={162}
                                    height={216}
                                    className="h-[320px] w-full rounded-lg border-2 border-white border-opacity-0 object-cover transition-opacity duration-300"
                                />
                                <div className="absolute left-2 top-2 inline-block rounded-full bg-gray-1 text-primary">
                                    <TypeTag tagName={product.genre} />
                                </div>
                                <div className="absolute bottom-2 right-2 z-20 inline-block rounded-full  text-primary">
                                    <Button
                                        type="button"
                                        title="按钮"
                                        onClick={(e) => {
                                            e.stopPropagation() // Prevents the click from bubbling up to the card
                                            e.preventDefault() // Prevents the default Link behavior
                                            onUpdateFavorite(product._id)
                                        }}
                                        className="flex w-full items-center justify-center py-2 text-center">
                                        {favorites[product._id] ? (
                                            <FaHeart />
                                        ) : (
                                            <CiHeart />
                                        )}
                                    </Button>
                                </div>
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="text-start">
                            <h5 className="w-full overflow-hidden text-ellipsis text-nowrap text-btn1 font-medium text-white">
                                {product.title}
                            </h5>
                            <div className="text-small2 font-regular">
                                <p className="mb-4 text-gray-5">
                                    {truncateBrief(product.brief)}
                                </p>
                                <div className="flex items-center text-white md:space-x-3">
                                    <TypeTag tagName={product.type} />
                                    <Tag
                                        icon={FaMapMarkerAlt}
                                        tagValue={product.theater}
                                        iconColor="gray-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile-Navbar */}
            <div className="flex overflow-x-scroll whitespace-nowrap scrollbar-hidden md:hidden">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="mx-1 inline-block w-32"
                        onClick={() => handleMovieDetail(product._id)}>
                        <Link href="">
                            <div className="relative h-[160px] w-[120px]">
                                <Image
                                    src={product.photoPath}
                                    alt={product.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg border-2 border-white border-opacity-0 transition-opacity duration-300"
                                />
                                <div className="absolute left-2 top-2 inline-block rounded-full bg-gray-1 text-primary">
                                    <TypeTag tagName={product.genre} />
                                </div>
                                <div className="absolute bottom-2 right-2 z-20 inline-block rounded-full  text-primary">
                                    <Button
                                        type="button"
                                        title="按钮"
                                        onClick={(e) => {
                                            e.stopPropagation() // Prevents the click from bubbling up to the card
                                            e.preventDefault() // Prevents the default Link behavior
                                            onUpdateFavorite(product._id)
                                        }}
                                        className="flex w-full items-center justify-center py-2 text-center">
                                        {favorites[product._id] ? (
                                            <FaHeart />
                                        ) : (
                                            <CiHeart />
                                        )}
                                    </Button>
                                </div>
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="text-start">
                            <div className="mt-2 text-btn2 font-medium text-white">
                                {truncateName(product.title)}
                            </div>
                            <div className="text-small2 font-regular">
                                <div className="text-gray-5">
                                    {' '}
                                    {truncateContentMobile(product.brief)}
                                </div>
                                <div className="text-white">
                                    <TypeTag tagName={product.type} />
                                    <div className="py-2">
                                        <Tag
                                            icon={FaMapMarkerAlt}
                                            tagValue={product.theater}
                                            iconColor="gray-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RecProductList
