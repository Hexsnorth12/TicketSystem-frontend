// /components/ProductList.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    truncateName,
    truncateContent,
    truncateContentMobile,
} from '@/utils/numberUtils'
import { formatdate } from '@/utils/dateUtils'
import Tag from '@components/common/Tag/tag'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { useRouter } from 'next/navigation'

type Group = {
    _id: string
    title: string
    movieTitle: string
    amount: number
    placeholderImg: string
    theater: string
    hasTicket: boolean
    time: string
    endAt: string
    startAt: string
    vacancy: number
    status: string
    content: string
    participantCount: number
}

type GroupProductListProps = {
    groups: Group[]
}

const PopProductList: React.FC<GroupProductListProps> = ({ groups }) => {
    const router = useRouter()
    function openEventModal(id: string) {
        router.push(`joinGroup?groupId=${id}`)
    }

    return (
        <>
            {/* Desktop-Navbar */}
            <div className="hidden md:mx-32 md:block">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    centeredSlides={true}
                    loop={true}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Navigation]}>
                    {groups.map((group) => (
                        <div
                            key={group._id}
                            className="m-4 overflow-hidden rounded-lg p-4">
                            <Link href="">
                                <SwiperSlide key={group._id}>
                                    <div
                                        className="relative h-[173px] w-[288px] cursor-pointer"
                                        onClick={openEventModal.bind(
                                            null,
                                            group._id as string,
                                        )}>
                                        <Image
                                            loader={() => group.placeholderImg}
                                            src={group.placeholderImg}
                                            alt={group.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                        />
                                        {/* Border-primary with blur effect */}
                                        <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                                    </div>
                                    <div className="text-start">
                                        <div className="mt-2 text-btn1 font-medium text-white">
                                            {truncateName(group.movieTitle)}
                                        </div>
                                        <div className="text-small2 font-regular">
                                            <div className="text-gray-5">
                                                {truncateContent(group.content)}
                                            </div>
                                            <div className="flex justify-between text-primary">
                                                <div>
                                                    {formatdate(group.time)}
                                                </div>
                                                <p className="px-2">
                                                    {group.vacancy}
                                                </p>
                                            </div>

                                            <div className="flex text-white">
                                                <div>{group.title}</div>
                                                <div className=" px-2">
                                                    <Tag
                                                        icon={FaMapMarkerAlt}
                                                        tagValue={group.theater}
                                                        iconColor="gray-4"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Link>
                        </div>
                    ))}
                </Swiper>
            </div>
            {/* Mobile-Navbar */}
            <div className="block flex overflow-x-scroll whitespace-nowrap md:hidden">
                {groups.map((group) => (
                    <div
                        key={group._id}
                        className="mx-1 inline-block"
                        onClick={openEventModal.bind(
                            null,
                            group._id as string,
                        )}>
                        <Link href="">
                            <div className="relative h-[129px] w-[216px] cursor-pointer">
                                <Image
                                    src={group.placeholderImg}
                                    alt={group.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg border-2 border-white border-opacity-0 border-opacity-100 transition-opacity duration-300"
                                />
                                {/* Border-primary with blur effect */}
                                <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                            </div>
                        </Link>
                        <div className="text-start">
                            <div className="mt-2 text-btn2 font-medium text-white">
                                {truncateName(group.movieTitle)}
                            </div>
                            <div className="text-small2 font-regular">
                                <div className="text-gray-5">
                                    {truncateContentMobile(group.content)}
                                </div>
                                <div className="flex justify-between text-primary">
                                    <div>{truncateContent(group.time)}</div>
                                    <p className="px-2">{group.vacancy}</p>
                                </div>

                                <div className="flex text-white">
                                    <div>{group.title}</div>
                                    <div className=" px-2">
                                        <Tag
                                            icon={FaMapMarkerAlt}
                                            tagValue={group.theater}
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

export default PopProductList
