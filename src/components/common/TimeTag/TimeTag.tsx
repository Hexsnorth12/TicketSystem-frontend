import React from 'react'

interface TimeTagProps {}

const TimeTag: React.FC<TimeTagProps> = () => {
    return (
        <div className="flex text-start">
            <div className="space-x-1 bg-gray-4 px-3 py-1">
                <span className="text-number5 leading-120 text-primary">1</span>
                <span className="text-small2 tracking-wide text-white">
                    日後到期
                </span>
            </div>
        </div>
    )
}

export default TimeTag
