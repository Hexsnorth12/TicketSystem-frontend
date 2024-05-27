'use client'
import React from 'react'
import Image from 'next/image'
import Button from '@components/common/Button'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import MovieTag from '../MovieTag/MovieTag'
import star from '@icon/star_gray.svg'
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
        <div className="relative h-full w-full ">
            {movies.map((movie, index) => {
                return (
                    <div key={index} className="relative h-full w-full">
                        <div
                            className="absolute -inset-4 bg-cover bg-center blur-lg"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(30, 30, 30, 0), rgba(30, 30, 30, 1)), url(${movie.image})`,
                            }}></div>
                        <div className="relative inset-0 flex h-full items-center justify-center bg-cover bg-center md:absolute md:inline-flex md:hidden">
                            <Image
                                src={movie.image}
                                alt={movie.name}
                                width={200}
                                height={264}
                                objectFit="contain"
                                className="rounded-lg transition-opacity duration-300"
                            />
                        </div>
                        <div className="relative z-10  grid h-full grid-flow-col grid-rows-6 content-center gap-4 ">
                            <div className="row-span-6 hidden items-center justify-center md:inline-flex">
                                <Image
                                    src={movie.image}
                                    alt={movie.name}
                                    width={360}
                                    height={480}
                                    objectFit="contain"
                                    className="rounded-lg  border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                />
                            </div>
                            <div className="col-span-1 row-span-1 flex items-center justify-start ">
                                <div className="flex  items-center justify-center gap-x-2">
                                    <MovieTag label="科幻類" />
                                    <Image
                                        src={star}
                                        alt="star"
                                        width={20}
                                        height={20}
                                    />
                                    <div className={bellota.className}>
                                        <p className="leading-1.5 text-number5 font-bold text-white md:text-number4">
                                            {movie.rank}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-1 flex items-center justify-start border-b-[1px] border-white">
                                <div className=" text-headline5 text-white md:text-header2 md:font-bold">
                                    {movie.name}
                                </div>
                            </div>
                            <div className="col-span-2 row-span-1 flex items-center justify-start">
                                <div className="flex">
                                    <div className={bellota.className}>
                                        <div className="flex items-center justify-center gap-x-2 text-center">
                                            <span className="leading-1.5 text-number5 font-bold text-gray-5 md:text-number4">
                                                NT$
                                            </span>
                                            <span className="leading-1.5 text-number4 font-bold text-primary md:text-number3">
                                                {movie.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-1">
                                <div className="text-small2 font-regular text-gray-5 md:text-small1">
                                    商品規格
                                </div>
                                <div className="mt-3 flex gap-x-2 md:mt-4">
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
                            <div className="col-span-2 row-span-1 mt-8">
                                <div className="mt-4 flex flex-col items-center gap-y-2 md:flex-row md:justify-start md:gap-x-2">
                                    <div className="w-full md:basis-1/5">
                                        <Counter
                                            onValueChange={() => {}}
                                            initialValue={1}
                                            minValue={1}
                                            maxValue={999}
                                        />
                                    </div>
                                    <div className="flex w-full gap-3 md:basis-4/5">
                                        <div className="flex-1">
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
                                        <div className="flex-1">
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
                    </div>
                )
            })}
        </div>
    )
}

export default MovieDetailCard
