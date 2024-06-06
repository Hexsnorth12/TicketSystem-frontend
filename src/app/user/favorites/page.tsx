import React from 'react'
import { MyFavorite } from '@/components/member'
import { favorites } from '@/definitions/movieData'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    const renderFavorites = favorites.map((movie) => (
        <MyFavorite key={movie.id} movie={movie} />
    ))
    return (
        <ul className="mx-auto flex flex-wrap justify-center gap-4">
            {renderFavorites}
        </ul>
    )
}

export default Page
