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
import { JoinCard } from '@/components/common'
import arrowLeftIcon from '@icon/arrow_left_white.svg'
import arrowRightIcon from '@icon/arrow_right_white.svg'

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
            <div className="relative select-none">
                <div className="prev absolute top-1/2 z-30 hidden h-[56px] w-[56px] cursor-pointer  rounded-full border border-primary xl:left-[-72px] xl:flex xl:items-center xl:justify-center">
                    <Image
                        src={arrowLeftIcon}
                        alt="scroll t0 left"
                        width={24}
                        height={24}
                        className="prev cursor-pointer "
                    />
                </div>
                <div className="next absolute top-1/2 z-30 hidden h-[56px] w-[56px] cursor-pointer  rounded-full border border-primary xl:right-[-72px] xl:flex xl:items-center xl:justify-center">
                    <Image
                        src={arrowRightIcon}
                        alt="scroll t0 left"
                        width={24}
                        height={24}
                        className="next cursor-pointer "
                    />
                </div>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    loop={true}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={{ prevEl: `.prev`, nextEl: `.next` }}
                    modules={[Navigation]}
                    className="max-w-[1296px]">
                    {groups.map((group) => (
                        <SwiperSlide
                            key={group._id}
                            className="min-w-[216px] md:max-w-[288px]">
                            <JoinCard group={group} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default PopProductList
