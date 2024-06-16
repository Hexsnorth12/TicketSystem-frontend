import React from 'react'
import MyFavorite from './MyFavorite'

export default {
    title: 'member/MyFavorite',
    component: MyFavorite,
}
const dummyData = {
    _id: '665b00748f529f5f17923acd',
    title: '這是個很棒的電影名稱喔',
    type: 'premier',
    genre: 'action',
    price: 1100,
    soldAmount: 0,
    amount: 100,
    isLaunched: true,
    photoPath: 'https://images.unsplash.com/photo-1554080353-a576cf803bda',
    sellStartAt: '2024-06-13T12:50:23.686Z',
    sellEndAt: '2024-06-13T12:50:23.686Z',
}

const InvalidData = {
    _id: '665b00748f529f5f17923acd',
    title: '這是個很棒的電影名稱喔',
    type: 'premier',
    genre: 'action',
    price: 1100,
    soldAmount: 0,
    amount: 100,
    isLaunched: true,
    photoPath: 'https://images.unsplash.com/photo-1554080353-a576cf803bda',
    sellStartAt: '2024-06-13T12:50:23.686Z',
    sellEndAt: '2026-06-13T12:50:23.686Z',
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
