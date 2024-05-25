import React from 'react'
import Image from 'next/image'
import avatar from '@images/avatar.jpg'
import Scrollbar from '../../common/ScrollTabs/Scrollbar'

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
                <p className="text-center text-header5 font-medium tracking-wider text-white md:text-header4 md:leading-120">
                    王小明
                </p>
            </div>
            <div className="-mx-3 border-b border-gray-3 py-3 md:mx-0 md:rounded-lg md:border md:px-4">
                <Scrollbar />
            </div>
        </div>
    )
}

export default Sidebar
