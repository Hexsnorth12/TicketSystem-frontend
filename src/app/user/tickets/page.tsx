import React from 'react'
import { ButtonGroup, TicketGroup } from '@/components/layout'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <div className="border-gray-3 py-6 md:border md:px-[60px] md:py-[60px]">
            <div className="flex">
                <ButtonGroup />
            </div>
            <div className="mt-4 md:mt-10">
                <TicketGroup />
            </div>
        </div>
    )
}

export default Page
