'use client'

import React from 'react'
import Image from 'next/image'
import { Counter, Button } from '@/components/common'
import fackImg from '@images/groupcard1.png'
import { useRouter } from 'next/navigation'
// import { usePostSellTicketMutation } from '@/services/modules/product'

interface PublishFormProps {}

const PublishForm: React.FC<PublishFormProps> = () => {
    const router = useRouter()
    const handleClose = () => {
        router.back()
    }
    return (
        <div>
            <h2 className="my-2 text-header5 text-white md:my-3">
                金剛大戰哥吉拉
            </h2>
            <p className="text-btn2 text-gray-4">台北場</p>
            <div className="my-2 flex items-center justify-between gap-3 md:my-3 md:justify-start md:gap-4">
                <div className="rounded-lg">
                    <Image
                        src={fackImg}
                        alt="group card"
                        width={120}
                        height={120}
                        className="h-full w-full rounded-lg object-cover"
                    />
                </div>
                <div className="w-1/4 grow md:grow-0">
                    <Counter onValueChange={() => {}} maxValue={999} />
                </div>
                <p className="text-btn2 text-white">350 NT</p>
            </div>
            <h3 className="my-2 text-header5 text-white md:my-3">注意事項</h3>
            <ol className="mb-3 h-[200px] space-y-1 overflow-y-scroll bg-gray-2 p-2 pr-4 text-small2  text-white scrollbar md:mb-4 md:h-auto md:p-0 md:py-2 md:scrollbar-hidden">
                <li>
                    為了確保我們的平台提供一個順暢且公正的電影票交流環境，請在使用分票功能時，仔細閱讀以下使用注意事項：
                </li>
                <li>
                    1.
                    價格固定：分票功能中所展示的票價是由發票方設定，且不得修改。這是為了確保所有會員都能在一個公平的條件下進行交易。
                </li>
                <li>
                    2.
                    交流用途：此功能旨在為我們的會員提供一個方便的電影票交流平台。請注意，平台只提供交流的場所，對於任何交易過程或結果不承擔責任。
                </li>
                <li>
                    3.
                    無法取消上架：一旦您決定將票券上架到分票平台，將無法取消。請在上架前仔細考慮，以避免不必要的困擾。
                </li>
                <li>
                    4.
                    自負責任：會員應對自己的行為負責。任何因不當使用分票功能而導致的法律責任或爭議，將由行為人自行承擔。
                </li>
                <li>
                    使用本平台的分票功能即表示您已經閱讀、理解並同意上述所有條款。我們期待您能在此基礎上，享受與其他影迷交流的樂趣。
                </li>
                <li>謝謝您的配合與支持！</li>
            </ol>
            <div className="flex justify-center">
                <Button
                    type="button"
                    onClick={handleClose}
                    className="mr-4"
                    title="cancel">
                    <span>取消</span>
                </Button>
                <Button
                    type="button"
                    onClick={() => {}}
                    className="mr-4"
                    title="submit">
                    <span>送出</span>
                </Button>
            </div>
        </div>
    )
}

export default PublishForm
