// /components/ProductList.tsx
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'
import { Button } from '@/components/common'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

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

type PopProductListProps = {
    products: Product[]
}

const PopProductList: React.FC<PopProductListProps> = ({ products }) => {
    const router = useRouter()
    const handleMovieDetail = (id: string) => {
        router.push(`/movies/${id}`)
    }
    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:block">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    initialSlide={2}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Navigation]}>
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className="m-4 overflow-hidden rounded-lg p-4">
                            <Link href="">
                                <SwiperSlide key={product._id}>
                                    <div className="relative h-[320px] w-[240px]">
                                        <Image
                                            src={product.photoPath}
                                            alt={product.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                        />
                                        {/* Border-primary with blur effect */}
                                        <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-between">
                                            <div className="mt-2 text-start text-white">
                                                <div className="text-btn1 font-medium">
                                                    {truncateName(
                                                        product.title,
                                                    )}
                                                </div>
                                                <div className="text-small1 font-regular text-gray-5">
                                                    {product.genre}
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    index < 3
                                                        ? 'bg-gradient-to-b from-primary to-gray-6 bg-clip-text text-number1 font-bold text-transparent'
                                                        : 'text-number1 font-bold text-gray-3'
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
                                </SwiperSlide>
                            </Link>
                        </div>
                    ))}
                </Swiper>
            </div>
            {/* Mobile-Navbar */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {products.map((product, index) => (
                    <div key={product._id} className="mx-3 inline-block w-32">
                        <Link href="">
                            <div className="relative h-[160px] w-[120px]">
                                <Image
                                    src={product.photoPath}
                                    alt={product.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
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

export default PopProductList
