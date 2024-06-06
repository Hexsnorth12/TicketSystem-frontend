import React from 'react'
import MyFavorite from './MyFavorite'
import fakeImage from '@images/groupcard4.jpg'

export default {
    title: 'member/MyFavorite',
    component: MyFavorite,
}
const dummyData = {
    name: '電影名稱1',
    id: '3',
    price: 800,
    date: '2024/04/03',
    image: fakeImage.src,
    type: '科幻',
    city: '台北市',
    isAvailable: true,
}

const InvalidData = {
    name: '電影名稱1',
    id: '3',
    price: 800,
    date: '2024/04/03',
    image: fakeImage.src,
    type: '科幻',
    city: '台北市',
    isAvailable: false,
}

export const Primary = () => {
    return (
        <div className="bg-bray-1 container">
            <ul className="flex">
                <MyFavorite movie={dummyData} />
            </ul>
        </div>
    )
}

export const Invalid = () => {
    return (
        <div className="bg-bray-1 container">
            <ul className="flex">
                <MyFavorite movie={InvalidData} />
            </ul>
        </div>
    )
}
