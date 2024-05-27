import React from 'react'
import { PaginationWrapper } from '@/components/common'
interface pageProps {}

const Page: React.FC<pageProps> = () => {
    return (
        <>
            <PaginationWrapper
                url={''}
                payload={{ userId: '' }}
                size={4}
                total={20}
                withEllipsis={true}
            />
        </>
    )
}

export default Page
