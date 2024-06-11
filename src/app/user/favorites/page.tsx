import React from 'react'

interface pageProps {}

const Page: React.FC<pageProps> = () => {
    // const renderFavorites = favorites.map((movie) => (
    //     <MyFavorite key={movie.id} product={movie} />
    // ))
    return (
        <ul className="mx-auto flex flex-wrap justify-center gap-4">
            {/* {renderFavorites} */}
        </ul>
    )
}

export default Page
