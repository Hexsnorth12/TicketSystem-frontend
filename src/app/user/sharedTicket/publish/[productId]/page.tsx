import React from 'react'
import { PublishForm } from '@/components/member'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    return (
        <div className="md:pl-[60px]">
            <PublishForm />
        </div>
    )
}

export default Page
