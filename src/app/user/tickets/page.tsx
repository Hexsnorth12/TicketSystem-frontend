import React from 'react'
import { ButtonGroup, TicketGroup } from '@/components/layout'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <div className=" py-6 md:py-0 md:pl-[60px]">
            <div className="flex gap-2">
                <ButtonGroup />
            </div>
            <div className="mt-4 md:mt-10">
                <TicketGroup />
            </div>
        </div>
    )
}

export default Page
