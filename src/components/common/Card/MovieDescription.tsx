'use client'
import React from 'react'
import Image from 'next/image'
import Chip from '@components/common/Chip/chip'
import { ProductDetail } from '@/types'
import fackImg from '@images/groupcard1.png'

interface Movie {
    name: string
    image: string
    type: string
    rank: number
    price: number
}

interface CardProps {
    movie: ProductDetail
}

const MovieDescriptionCard: React.FC<CardProps> = ({ movie }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-y-6 md:gap-y-10 ">
                <div className="flex flex-row flex-wrap  gap-2 ">
                    <Chip value="2024亞洲日舞影展" />
                    <Chip value="2022 台灣國際酷兒影展" />
                    <Chip value="享優惠96折" />
                    <Chip value="買一送一" />
                </div>
                <div className=" flex max-w-6xl flex-col gap-y-10">
                    <div>
                        <h1 className="mb-2 text-btn2 font-medium leading-6 tracking-widest text-primary md:mb-4 md:text-header5">
                            臨時通知
                        </h1>
                        <p className="text-small2 leading-5 text-gray-5 md:text-small1 md:leading-6">
                            導演丹尼維勒納夫繼改編法蘭克赫伯特同名小說《沙丘》後，《沙丘：第二部》將繼續述說這個傳奇故事，並且擴大演員陣容，在布達佩斯、阿布達比、約旦和義大利等地拍攝。影片將探索保羅亞崔迪的偉大神祕之旅，他和荃妮以及弗瑞曼人聯手，對毀滅他家族的陰謀者展開報復。保羅必須在他畢生摯愛與已知宇宙命運之間做抉擇，並且努力阻止只有他能預見的可怕未來。
                        </p>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4">
                                臨時通知
                            </h2>
                            <li>
                                深入參觀雪梨歌劇院，欣賞全球最大的無梁拱形天花板AA
                            </li>
                            <li>
                                聆聽導覽，了解雪梨歌劇院富有戲劇性的豐富歷DD史
                            </li>
                            <li>
                                感受雪梨歌劇院的建築魅力，享受從內望出的絕美海景DD視野
                            </li>
                            <li>
                                欣賞雪梨歌劇院歌劇表演，沒有感受過雪梨歌劇院\CC的視聽盛宴，你的雪梨之旅就不算完美
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4 ">
                                活動亮點
                            </h2>
                            <li>
                                深入參觀雪梨歌劇院，欣賞全球最大的無梁拱形天花板AA
                            </li>
                            <li>
                                聆聽導覽，了解雪梨歌劇院富有戲劇性的豐富歷DD史
                            </li>
                            <li>
                                感受雪梨歌劇院的建築魅力，享受從內望出的絕美海景DD視野
                            </li>
                            <li>
                                欣賞雪梨歌劇院歌劇表演，沒有感受過雪梨歌劇院\CC的視聽盛宴，你的雪梨之旅就不算完美
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-white md:mb-4 ">
                                活動介紹
                            </h2>
                            <p className="">
                                導演丹尼維勒納夫繼改編法蘭克赫伯特同名小說《沙丘》後，《沙丘：第二部》將繼續述說這個傳奇故事，並且擴大演員陣容，在布達佩斯、阿布達比、約旦和義大利等地拍攝。影片將探索保羅亞崔迪的偉大神祕之旅，他和荃妮以及弗瑞曼人聯手，對毀滅他家族的陰謀者展開報復。保羅必須在他畢生摯愛與已知宇宙命運之間做抉擇，並且努力阻止只有他能預見的可怕未來。
                            </p>
                        </ul>
                    </div>
                    <div className="relative h-full w-full">
                        <Image
                            layout="responsive" // required
                            objectFit="cover" // change to suit your needs
                            src={fackImg}
                            alt={movie.title}
                            width={1076}
                            height={640}
                            className="rounded-lg"
                        />
                        <p className=" mt-2 text-small2  text-gray-5 md:mt-4 md:text-small1">
                            雪梨歌劇院是雪梨的城市地標，不親自走一回別說你到過雪梨！
                        </p>
                    </div>
                    <div className="relative h-full w-full ">
                        <Image
                            layout="responsive" // required
                            objectFit="cover" // change to suit your needs
                            src={fackImg}
                            alt={movie.title}
                            width={1076}
                            height={640}
                            className="rounded-lg"
                        />
                        <p className=" mt-2 text-small2  text-gray-5 md:mt-4 md:text-small1">
                            雪梨歌劇院是雪梨的城市地標，不親自走一回別說你到過雪梨！
                        </p>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className=" mb-2 text-small1 text-white md:mb-4">
                                注意事項
                            </h2>
                            <li>請提早到達以便進行安檢，盡量勿攜帶包包</li>
                            <li>導遊會在遊覽過程中提醒你請勿拍照</li>
                            <li>
                                請注意：大於標準規格（A4大小）的手提袋需要寄存，且在寄存前有可能被搜查。雪梨歌劇院不提供行李箱及大型背包寄放服務
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                確認詳情
                            </h2>
                            <li>
                                訂單立即確認，如未收到訂單確認資訊，請聯繫客服
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                取消政策
                            </h2>
                            <li>活動開始48小時前可免費取消</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-inside list-disc text-small2 text-gray-5 md:text-small1">
                            <h2 className="mb-2 text-small1 text-white md:mb-4">
                                憑證類型
                            </h2>
                            <li>請出示電子憑證</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDescriptionCard
