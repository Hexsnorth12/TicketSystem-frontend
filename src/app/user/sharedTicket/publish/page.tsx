import React from 'react'
import { PublishForm } from '@/components/member'

import fetchServer from '@/lib/fetchServer'
import { PublishData } from '@/types/product'

interface pageProps {
    searchParams?: { [key: string]: string }
}

const Page: React.FC<pageProps> = async ({ searchParams }) => {
    const productId = searchParams?.productId ?? ''
    const orderId = searchParams?.orderId ?? ''
    const { data }: { data: PublishData } = await fetchServer({
        method: 'GET',
        url: `api/v1/ticket/orderInfo?orderId=${orderId}&productId=${productId}`,
    })

    return (
        <div className="md:pl-[60px]">
            <PublishForm data={data} orderId={orderId} productId={productId} />
        </div>
    )
}

export default Page
