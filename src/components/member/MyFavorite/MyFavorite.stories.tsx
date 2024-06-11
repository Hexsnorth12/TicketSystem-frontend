import React from 'react'
import MyFavorite from './MyFavorite'
import fakeImage from '@images/groupcard4.jpg'

export default {
    title: 'member/MyFavorite',
    component: MyFavorite,
}
const dummyData = {
    title: '沙丘3',
    _id: '6665805ad23d0fe8146bcc0e',
    price: 800,
    startAt: '2024-06-19T16:34:02.686Z',
    endAt: '2024-07-20T14:34:02.685Z',
    photoPath: fakeImage.src,
    type: '科幻',
    isAvailable: true,
}

const InvalidData = {
    title: '沙丘3',
    _id: '6665805ad23d0fe8146bcc0e',
    price: 800,
    startAt: '2024-06-19T16:34:02.686Z',
    endAt: '2024-07-20T14:34:02.685Z',
    photoPath: fakeImage.src,
    type: '科幻',
    isAvailable: false,
}

export const Primary = () => {
    return (
        <div className="bg-bray-1 container">
            <ul className="flex">
                <MyFavorite product={dummyData} />
            </ul>
        </div>
    )
}

export const Invalid = () => {
    return (
        <div className="bg-bray-1 container">
            <ul className="flex">
                <MyFavorite product={InvalidData} />
            </ul>
        </div>
    )
}
