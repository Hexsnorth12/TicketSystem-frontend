import React from 'react'
import { CommentCard } from '@components/common'
import avatar from '@images/avatar.jpg'

interface Props {}

const Page: React.FC<Props> = () => {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:gap-6">
            <CommentCard
                avatar={avatar}
                userName={'lovealgebra'}
                comment=" 你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                stars={1}
            />
            <CommentCard
                avatar={avatar}
                userName={'lovealgebra'}
                comment="老實說，雖然《沙丘》的評價相當優秀，但我當時並沒有特別喜歡這部電影，總覺得劇情比例與整體節奏上有些失調，後半段的沙漠逃亡之旅實在太過冗長，反倒是前面主角一家的滅門之仇，應該要有更多戲份來呈現那些角色，才會使觀眾對滅門一事更有共鳴。老實說，雖然《沙丘》的評價相當優秀，但我當時並沒有特別喜歡這部電影，總覺得劇情比例與整體節奏上有些失調，後半段的沙漠逃亡之旅實在太過冗長，反倒是前面應該要有更多...了解更多"
                stars={2}
            />
            <CommentCard
                avatar={avatar}
                userName={'lovealgebra'}
                comment="你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」你可以把《沙丘》想成一個發生在外太空的大型宮鬥現場，有皇帝、各大氏族、被剝奪資源的原住民，以及在背後操弄大局的巫女。而在太空中最珍貴的資源，就是電影所謂的「香料」"
                stars={5}
            />
        </div>
    )
}

export default Page
