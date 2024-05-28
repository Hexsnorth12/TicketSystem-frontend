import React from 'react'
import { MyComment } from '@/components/member'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div>
            <div className="">
                <MyComment
                    productName="沙丘：帝國"
                    starts={3}
                    comment="太空中最珍貴的資源，就是電影所謂的「香料"
                />
            </div>
            <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div>
            <div className="">
                <MyComment
                    productName="比悲傷更悲傷的故事"
                    starts={3}
                    comment="你可以把《沙丘》想現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                />
            </div>
        </div>
    )
}

export default Page
