import React from 'react'
import { UserInfoForm } from '@/components/forms'
import type { UserInfo } from '@/types'
import fetchClient from '@/lib/fetchClient'
import { getUserSession } from '@/lib/auth.actions'
import { BASE_URL } from '@/definitions'

const Page = async () => {
    const { session } = await getUserSession()
    const { data }: { data: UserInfo } = await fetchClient({
        method: 'GET',
        url: `api/v1/user`,
        token: session?.user?.token,
        tags: ['info'],
    })

    return (
        <div className="border-gray-3 py-6 md:border md:px-[60px] md:py-[60px]">
            <h4 className="mb-3 text-header4 text-white md:mb-6">個人資料</h4>
            <UserInfoForm userInfo={data} />
        </div>
    )
}

export default Page
