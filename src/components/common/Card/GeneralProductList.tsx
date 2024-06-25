import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'
import { Button } from '@/components/common'
import { TypeTag } from '@/components/Buttons'
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

type PopProductListProps = {
    products: Product[]
    favorites: Record<string, boolean>
    onUpdateFavorite: (productId: string) => void
}

const GeneralProductList: React.FC<PopProductListProps> = ({
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
            {/* Desktop View */}
            <div className="hidden md:mt-6 md:grid md:grid-cols-5 md:gap-4 md:px-32">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="overflow-hidden rounded-lg"
                        onClick={() => handleMovieDetail(product._id)}
                        style={{ cursor: 'pointer' }}>
                        <div className="overflow-hidden rounded-lg">
                            <Link href={`/movies/${product._id}`}>
                                <div className="relative h-[210px] w-[160px]">
                                    <Image
                                        src={product.photoPath}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg border-2 border-white border-opacity-0 transition-opacity duration-300 hover:border-opacity-100"
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
                                            {' '}
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
                                <div className="text-center">
                                    <div className="flex justify-between">
                                        <div className="mt-2 text-start text-white">
                                            <div className="text-btn1 font-medium">
                                                {truncateName(product.title)}
                                            </div>
                                            <div className="text-small1 font-regular text-gray-5">
                                                {product.genre}
                                            </div>
                                            <div className="text-small1 font-regular text-gray-5">
                                                {product.theater}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        title="立即購票"
                                        className="py-1"
                                        onClick={() =>
                                            handleMovieDetail(product._id)
                                        }>
                                        立即購票
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Mobile View */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {products.map((product, index) => (
                    <div key={product._id} className="mx-3 inline-block w-32">
                        <Link href={`/movies/${product._id}`}>
                            <div className="relative h-[160px] w-[120px]">
                                <Image
                                    src={product.photoPath}
                                    alt={product.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                                <div className="absolute bottom-2 right-2 z-20 inline-block rounded-full text-primary">
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
                            <div className="text-center">
                                <div className="flex">
                                    <div className="mt-2 text-start text-white">
                                        <div className="text-btn2 font-medium">
                                            {truncateName(product.title)}
                                        </div>
                                        <div className="text-small2 font-regular text-gray-5">
                                            {product.genre}
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            index < 3
                                                ? 'bg-gradient-to-b from-primary to-gray-6 bg-clip-text text-number2 font-bold text-transparent'
                                                : 'text-number2 font-bold text-gray-3'
                                        }>
                                        {index + 1}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    title="立即購票"
                                    className="py-1"
                                    onClick={() =>
                                        handleMovieDetail(product._id)
                                    }>
                                    立即購票
                                </Button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GeneralProductList
