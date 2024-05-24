'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { truncateName } from '../../../utils/numberUtils'
import Button from '../../common/Button/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import MovieTag from '../MovieTag/MovieTag'
import star from '@icon/star_gray.svg'
import clsx from 'clsx'
import { bellota } from '../../fonts'
import Counter from '../Counter/Counter'
import Tag from '../Tag/tag'
import { IoCartOutline } from 'react-icons/io5'
import { CiHeart } from 'react-icons/ci'

interface Movie {
    name: string
    image: string
    type: string
    rank: number
    price: number
}

interface CardProps {
    movies: Movie[]
}

const MovieDetailCard: React.FC<CardProps> = ({ movies }) => {
    const handleOnclick = () => {
        console.log('onclick！')
    }

    return (
        <div className="relative h-[600px] w-full ">
            <div className="relative z-10 grid h-full grid-flow-col grid-rows-6 content-center gap-4">
                <div className="row-span-6 flex items-center justify-center ">
                    <Image
                        src="/assets/popcard2.jpg"
                        alt="popcard2"
                        width={360}
                        height={480}
                        objectFit="contain"
                        className="rounded-lg border-opacity-0 border-opacity-100 transition-opacity duration-300"
                    />
                </div>
                <div className="col-span-1 row-span-1 flex items-center justify-start">
                    <div className="flex gap-x-2">
                        <MovieTag label="科幻類" />
                        <Image src={star} alt="star" width={20} height={20} />
                        <div className={bellota.className}>
                            <p className="leading-1.5 text-number4 font-bold text-white">
                                3.8
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 flex items-center justify-start border-b-[1px] border-white">
                    <div className="text-header2 font-bold text-white">
                        沙丘二
                    </div>
                </div>
                <div className="col-span-2 row-span-1 flex items-center justify-start">
                    <div className="flex">
                        <div className={bellota.className}>
                            <div className="flex items-center justify-center gap-x-2 text-center">
                                <span className="leading-1.5 text-number4 font-bold text-gray-5">
                                    NT$
                                </span>
                                <span className="leading-1.5 text-number3 font-bold text-primary">
                                    800
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 row-span-1">
                    <div className="text-small1 text-gray-5">商品規格</div>
                    <div className="mt-4 flex gap-x-2">
                        <Button
                            type="button"
                            title="按钮"
                            onClick={handleOnclick}>
                            兩人同行
                        </Button>
                        <Button
                            type="button"
                            title="按钮"
                            onClick={handleOnclick}>
                            三人同行
                        </Button>
                        <Button
                            type="button"
                            title="按钮"
                            onClick={handleOnclick}>
                            一人獨享
                        </Button>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 ">
                    <div className="mt-4 flex items-center justify-start gap-x-2">
                        <div className="basis-1/5">
                            <Counter
                                onValueChange={() => {}}
                                initialValue={1}
                                minValue={1}
                                maxValue={999}
                            />
                        </div>
                        <div className="basis-2/5">
                            <Button
                                type="button"
                                title="按钮"
                                onClick={handleOnclick}
                                className="flex w-full items-center justify-center text-center">
                                <Tag
                                    icon={IoCartOutline}
                                    tagValue="加入購物車"
                                    iconColor="inherit"
                                />
                            </Button>
                        </div>
                        <div className="basis-2/5">
                            <Button
                                type="button"
                                title="按钮"
                                onClick={handleOnclick}
                                className="flex w-full items-center justify-center text-center">
                                <Tag
                                    icon={CiHeart}
                                    tagValue="收藏"
                                    iconColor="inherit"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailCard
