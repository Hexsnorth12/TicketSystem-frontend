import React from 'react'

interface MovieTagProps {
    label: string
}

const MovieTag: React.FC<MovieTagProps> = ({ label }) => {
    return (
        <div className="inline-block rounded-primary bg-gray-1 px-3 py-1">
            <span className="text-small2 text-primary">{label}</span>
        </div>
    )
}

export default MovieTag
