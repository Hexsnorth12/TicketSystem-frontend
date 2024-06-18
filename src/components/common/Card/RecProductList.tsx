// /components/ProductList.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { TypeTag } from '@/components/Buttons'
import Tag from '@components/common/Tag/tag'
import {
    truncateName,
    truncateContent,
    truncateContentMobile,
} from '../../../utils/numberUtils'
import { FaMapMarkerAlt } from 'react-icons/fa'

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
}

type RecProductListProps = {
    products: Product[]
}

const RecProductList: React.FC<RecProductListProps> = ({ products }) => {
    const router = useRouter() // 获取路由对象
    const handleMovieDetail = (id: string) => {
        router.push(`/movies/${id}`)
    }
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:px-32">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="m-4 overflow-hidden rounded-lg p-4"
                        onClick={() => handleMovieDetail(product._id)}
                        style={{ cursor: 'pointer' }}>
                        <Link href="">
                            <div className="relative h-[210px] w-[160px]">
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
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="text-start">
                            <div className="mt-2 text-btn1 font-medium text-white">
                                {truncateName(product.title)}
                            </div>
                            <div className="text-small2 font-regular">
                                <div className="text-gray-5">
                                    {' '}
                                    {truncateContent(product.brief)}
                                </div>
                                <div className="flex text-white">
                                    <TypeTag tagName={product.type} />
                                    <div className="pt-2">
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
            {/* Mobile-Navbar */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {products.map((product) => (
                    <div key={product._id} className="mx-1 inline-block w-32">
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
