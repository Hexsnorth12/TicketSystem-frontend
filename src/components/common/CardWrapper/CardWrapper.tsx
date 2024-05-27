import React, { ReactNode } from 'react'

interface CardWrapperProps {
    children: ReactNode
    className: string
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
    return <div>{children}</div>
}

export default CardWrapper
