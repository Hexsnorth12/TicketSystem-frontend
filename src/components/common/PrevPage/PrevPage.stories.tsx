import React from 'react'
import PrevPage from './PrevPage'

export default {
    title: 'common/PrevPage',
    component: PrevPage,
}

export const Primary = () => {
    return (
        <div className="container hidden md:my-10 md:block">
            <PrevPage pageName="我的電影票" pagePath="/#" />
        </div>
    )
}
