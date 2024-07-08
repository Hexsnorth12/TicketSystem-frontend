'use client'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useLazyGetProductsQuery } from '@/services/modules/product'
import { ProductCard } from '@/components/common'

interface PageProps {
    searchParams?: { [key: string]: string }
}

const Page = ({ searchParams }: PageProps) => {
    const keyWord = searchParams?.keyword || ''
    const { data: session } = useSession()

    const [getProducts, { data }] = useLazyGetProductsQuery()

    useEffect(() => {
        getProducts({
            title: keyWord,
            token: session?.accessToken || '',
        }).unwrap()
    }, [keyWord])

    const renderProducts = () => {
        const products = data?.products || []
        if (data) {
            return products.map((product) => (
                <div className="flex-1 md:max-w-[30%]" key={product._id}>
                    <ProductCard product={product} />
                </div>
            ))
        }
    }

    return (
        <section className="h-[88px] min-h-lvh pt-5">
            <div className="container">
                {/* {shuffledPopcards.map((popcard, index) => (
                    <div key={index}>
                        <div className="h-full w-full">
                            <Image
                                fill
                                objectFit="cover"
                                src={popcard.image}
                                alt={popcard.name}
                            />
                        </div>
                    </div>
                ))} */}
                <div className="mb-4 flex flex-col items-start md:space-y-4">
                    <p className="text-header5 font-bold tracking-widest text-white md:text-header2">
                        <span>找到了</span>
                        <span className="text-primary">
                            {data?.products.length}
                        </span>
                        <span>個電影票券！</span>
                    </p>
                    <div className="mb-4 text-left text-body text-white">
                        太讚惹！在
                        {data?.products.map((product, index) => {
                            return (
                                <span
                                    className="text-primary"
                                    key={product._id}>
                                    {product.theater}
                                    {index === data.products.length - 1
                                        ? ''
                                        : '、'}
                                </span>
                            )
                        })}
                        <p>{`找到 ${data?.products.length} 個電影票券 🏝`}</p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-wrap gap-3">
                {renderProducts()}
            </div>
        </section>
    )
}

export default Page
