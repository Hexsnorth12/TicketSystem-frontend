import React from 'react'
import { UserInfoForm } from '@/components/forms'
import type { UserInfo } from '@/types'
import fetchServer from '@/lib/fetchServer'
import { getUserSession } from '@/lib/auth.actions'

const Page = async () => {
    const { data }: { data: UserInfo } = await fetchServer({
        method: 'GET',
        url: `api/v1/user`,
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
