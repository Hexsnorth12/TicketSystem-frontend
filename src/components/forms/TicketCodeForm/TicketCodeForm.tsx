'use client'
import React from 'react'
import { InputComponent, Button } from '@/components/common'

interface TicketCodeFormProps {}

const TicketCodeForm: React.FC<TicketCodeFormProps> = () => {
    return (
        <section>
            <h3 className="mb-6 text-center text-header5 text-white md:text-header4">
                取得票卷
            </h3>
            <form action="">
                <InputComponent
                    label="輸入驗證碼"
                    type="text"
                    value={''}
                    onChange={() => {}}
                    placeholder="請輸入驗證碼"
                />
                <div className="flex justify-center">
                    <Button
                        className="mt-10"
                        type={'button'}
                        title={'confirm'}
                        onClick={() => {}}>
                        <span>確認</span>
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default TicketCodeForm
