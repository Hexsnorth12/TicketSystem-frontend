'use client'
import React from 'react'
import { ModalContent } from '@/components/common'
import { QRCodeSVG } from 'qrcode.react'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <ModalContent tittle="比悲傷更悲傷的故事" hasCancel>
            <div className="container w-[300px] p-4 pt-0 md:w-[500px]">
                <div className="mb-6 text-center">
                    <p className="mb-2.5 text-small2 text-gray-5 md:mb-2 md:text-small1">
                        票種
                    </p>
                    <p className="text-small2 text-white md:text-small1">
                        IMAX 全票
                    </p>
                </div>
                <div className="mb-6 text-center">
                    <p className="md:text-small t mb-2.5 text-small2 text-gray-5 md:mb-2">
                        日期
                    </p>
                    <p className="text-small2 text-white md:text-small1">
                        2024.03.23
                    </p>
                </div>
                <div className="mb-6 text-center">
                    <p className="t mb-2.5 text-small2 text-gray-5 md:mb-2 md:text-small1">
                        數量
                    </p>
                    <p className="text-small2 text-white md:text-small1">2</p>
                </div>
                <div className="mb-6 text-center">
                    <p className="t mb-2.5 text-small2 text-gray-5 md:mb-2 md:text-small1">
                        取票驗證碼
                    </p>
                    <div className="flex justify-center">
                        <QRCodeSVG
                            value={
                                'https://picturesofpeoplescanningqrcodes.tumblr.com/'
                            }
                            size={200}
                            bgColor={'#ffffff'}
                            fgColor={'#000000'}
                            level={'L'}
                            includeMargin={false}
                            // imageSettings={{
                            //     src: './public/assets/images/go.png',
                            //     x: undefined,
                            //     y: undefined,
                            //     height: 24,
                            //     width: 24,
                            //     excavate: true,
                            // }}
                        />
                    </div>
                </div>
            </div>
        </ModalContent>
    )
}

export default Page
