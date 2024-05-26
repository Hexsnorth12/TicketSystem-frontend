'use client'

import React from 'react'
import TextField from './TextField'
export default {
    title: 'ticket/TextField',
    component: TextField,
}

export const Primary = () => {
    return (
        <div className="contaner">
            <div className="bg-gray-2">
                <div className="rounded-lg border border-gray-3 px-4 py-6 md:px-[60px] md:py-10">
                    <TextField
                        label={'加購'}
                        containerStyle="border-b border-gray-3">
                        <p className="flex ">
                            <span className="text-small2 leading-150 text-white md:text-small1">
                                演員見面會週邊及電影全幅海報
                            </span>
                        </p>
                    </TextField>
                </div>
            </div>
        </div>
    )
}
