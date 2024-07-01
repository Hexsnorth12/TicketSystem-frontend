'use client'
import React from 'react'
import Image from 'next/image'
import Chip from '@components/common/Chip/chip'
import { ProductDetail } from '@/types'

interface CardProps {
    product: ProductDetail
}

const MovieDescriptionCard: React.FC<CardProps> = ({ product }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-y-6 md:gap-y-10 ">
                <div className="flex flex-row flex-wrap  gap-2 ">
                    {product.tags.map((tag, index) => {
                        return <Chip key={index} value={tag.name} />
                    })}
                    {product.theater && <Chip value={product.theater} />}
                    {product.type && <Chip value={product.type} />}
                </div>
                <div className=" flex max-w-6xl flex-col gap-y-10">
                    <div>
                        <h1 className="mb-2 text-btn2 font-medium leading-6 tracking-widest text-primary md:mb-4 md:text-header5">
                            簡介
                        </h1>
                        <p className="text-small2 leading-5 text-gray-5 md:text-small1 md:leading-6">
                            {product.brief}
                        </p>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4">
                                臨時通知
                            </h2>
                            {product.notifications.map(
                                (notification, index) => {
                                    return <li key={index}>{notification}</li>
                                },
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4 ">
                                活動亮點
                            </h2>
                            {product.highlights.map((highlight, index) => {
                                return <li key={index}>{highlight}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4 ">
                                活動介紹
                            </h2>
                            <p className="">{product.introduction}</p>
                        </ul>
                    </div>
                    <div className="relative h-full w-full">
                        <Image
                            layout="responsive" // required
                            objectFit="cover" // change to suit your needs
                            src={product.photoPath}
                            alt={product.title}
                            width={1076}
                            height={640}
                            className="rounded-lg"
                        />
                        {/* <p className=" mt-2 text-small2  text-gray-5 md:mt-4 md:text-small1">
                            雪梨歌劇院是雪梨的城市地標，不親自走一回別說你到過雪梨！
                        </p> */}
                    </div>
                    {/* <div className="relative h-full w-full ">
                        <Image
                            layout="responsive" // required
                            objectFit="cover" // change to suit your needs
                            src={product.photoPath}
                            alt={product.title}
                            width={1076}
                            height={640}
                            className="rounded-lg"
                        />
                        <p className=" mt-2 text-small2  text-gray-5 md:mt-4 md:text-small1">
                            雪梨歌劇院是雪梨的城市地標，不親自走一回別說你到過雪梨！
                        </p>
                    </div> */}
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className=" mb-2 text-small1 text-white md:mb-4">
                                注意事項
                            </h2>
                            {product.cautions.map((caution, index) => {
                                return <li key={index}>{caution}</li>
                            })}
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                確認詳情
                            </h2>
                            {product.confirmations.map(
                                (confirmation, index) => {
                                    return <li key={index}>{confirmation}</li>
                                },
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                取消政策
                            </h2>
                            {product.cancelPolicies.map(
                                (cancelPolicie, index) => {
                                    return <li key={index}>{cancelPolicie}</li>
                                },
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                憑證類型
                            </h2>
                            {product.certificates.map((certificate, index) => {
                                return <li key={index}>{certificate}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDescriptionCard
