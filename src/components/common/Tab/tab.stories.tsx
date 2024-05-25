import * as React from 'react'
import Tab from './basicTabs'
import MovieTab from './movieDetail'

export default {
    title: 'common/Tab',
    component: { Tab, MovieTab },
}
const tabs = [
    {
        label: '電影介紹',
        Component: <div>Hello, I am tab 1</div>,
    },
    {
        label: '評價',
        Component: <div>Hello, I am tab 2</div>,
    },
]

export const Primary = () => {
    return (
        <div className="bg-inherit">
            <Tab tabs={tabs} />
        </div>
    )
}

export const Movie = () => {
    return (
        <div className="bg-black">
            <MovieTab tabs={tabs} />
        </div>
    )
}
