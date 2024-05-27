import React from 'react'
import Page from './page'

export default {
    title: 'common/moviePage',
    component: Page,
}

export const Primary = () => {
    return <Page params={{ slug: '1' }} />
}
