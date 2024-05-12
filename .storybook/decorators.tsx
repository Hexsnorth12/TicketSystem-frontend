import React from 'react'
import StoreProviders from '../src/components/common/StoreProviders'

export const Decorators = (story: Function) => {
    return <StoreProviders>{story()}</StoreProviders>
}
