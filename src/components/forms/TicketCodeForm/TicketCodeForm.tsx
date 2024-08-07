'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { InputComponent, Button } from '@/components/common'
import { useClaimTicketMutation } from '@/services/modules/user'
import LoadingSkeleton from '@/components/LoadingSkeleton/Loading'
import { useAlert } from '@/components/useAlert/useAlert'

interface TicketCodeFormProps {}

const TicketCodeForm: React.FC<TicketCodeFormProps> = () => {
    const [ticketCode, setTicketCode] = useState('')
    const [claimTicket, { isSuccess, isLoading }] = useClaimTicketMutation()
    const { data: session } = useSession()
    const router = useRouter()
    const showAlert = useAlert()

    const handleClaimTicket = async () => {
        try {
            await claimTicket({
                payload: { shareCode: ticketCode },
                token: session?.accessToken ?? '',
            }).unwrap()
        } catch (error) {
            console.error(error)
            showAlert('輸入分票碼失敗', 'error')
        }
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            showAlert('取得票券成功', 'success')
            router.push(`/user/tickets?status=unverified`, {
                scroll: false,
            })
            router.refresh()
        }
    }, [isSuccess, isLoading])
    return (
        <section>
            {isLoading && (
                <div className="absolute left-[50%] top-0 z-30 -translate-x-1/2">
                    <LoadingSkeleton />
                </div>
            )}
            <h3 className="mb-6 text-center text-header5 text-white md:text-header4">
                取得票券
            </h3>
            <form action="">
                <InputComponent
                    label="輸入驗證碼"
                    type="text"
                    value={ticketCode}
                    onChange={(value) => setTicketCode(value)}
                    placeholder="請輸入驗證碼"
                />
                <div className="flex justify-center">
                    <Button
                        className="mt-10"
                        type={'button'}
                        title={'confirm'}
                        onClick={handleClaimTicket}>
                        <span>確認</span>
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default TicketCodeForm
