import React from 'react'
import Image from 'next/image'
import arrow from '@icon/arrow_right_primary.svg'
import avatar from '@images/avatar.jpg'

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
    return (
        <div className="w-full md:w-4/12 md:px-6 md:py-8">
            <div className="mb-4 md:mb-6">
                <div className="mx-auto mb-4 h-[83px] w-[80px] rounded-full bg-gradient-to-b from-primary to-gray-6 p-[3px] md:h-[123px] md:w-[120px]">
                    <Image
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full rounded-full"
                        width={80}
                        height={80}
                    />
                </div>
                <p className="text-center text-header5 font-medium tracking-[2px] text-white md:text-header4 md:leading-120">
                    王小明
                </p>
            </div>

            <div className="overflow-hidden border-b border-gray-3 py-3 md:rounded-lg md:border md:px-4">
                <ul className=" m-0 flex gap-6 px-3 md:block">
                    <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                        <p className="text-nowrap text-small2 md:text-btn2">
                            會員資料
                        </p>
                        <Image
                            src={arrow}
                            width={24}
                            height={24}
                            className="hidden md:block"
                            alt="navigation to user info"
                        />
                    </li>
                    <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                        <p className="text-nowrap text-small2 md:text-btn2">
                            會員資料
                        </p>
                        <Image
                            src={arrow}
                            width={24}
                            height={24}
                            className="hidden md:block"
                            alt="navigation to user info"
                        />
                    </li>
                    <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                        <p className="text-nowrap text-small2 md:text-btn2">
                            會員資料
                        </p>
                        <Image
                            src={arrow}
                            width={24}
                            height={24}
                            className="hidden md:block"
                            alt="navigation to user info"
                        />
                    </li>
                    <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                        <p className="text-nowrap text-small2 md:text-btn2">
                            會員資料
                        </p>
                        <Image
                            src={arrow}
                            width={24}
                            height={24}
                            className="hidden md:block"
                            alt="navigation to user info"
                        />
                    </li>
                    <li className="inline-block text-white  hover:text-primary md:flex md:justify-between md:border-b md:border-gray-3 md:py-4">
                        <p className="text-nowrap text-small2 md:text-btn2">
                            會員資料
                        </p>
                        <Image
                            src={arrow}
                            width={24}
                            height={24}
                            className="hidden md:block"
                            alt="navigation to user info"
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
