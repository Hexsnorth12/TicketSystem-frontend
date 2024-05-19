import React from 'react'
import { UserInfoForm } from '@/components/forms'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib'
import { serverFetch } from '@/utils'
import type { UserInfo } from '@/types'

const Page = async () => {
    //await verifySession()
    const token = cookies().get('token')?.value || ''

    const data: UserInfo = await serverFetch('api/v1/user', token, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
        },
        nextConfig: { tags: ['info'] },
    })

    return (
        <div className="border-gray-3 py-6 md:border md:px-[60px] md:py-[60px]">
            <h4 className="mb-3 text-header4 text-white md:mb-6">個人資料</h4>
            <UserInfoForm userInfo={data} />
        </div>
    )
}

export default Page
