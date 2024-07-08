import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaMapMarkerAlt } from 'react-icons/fa'

import { TypeTag } from '@/components/Buttons'
import Tag from '@components/common/Tag/tag'
import { Product } from '@/types/product'
import { truncateBrief } from '../../../utils/numberUtils'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter()

    const handleMovieDetail = (id: string) => {
        router.push(`/movies/${id}`)
    }
    return (
        <div
            key={product._id}
            className="md:mb-10"
            onClick={() => handleMovieDetail(product._id)}
            style={{ cursor: 'pointer' }}>
            <Link href="">
                <div className="relative min-h-[210px]">
                    <Image
                        src={product.photoPath}
                        alt={product.title}
                        objectFit="cover"
                        width={162}
                        height={216}
                        className="h-[320px] w-full rounded-lg border-2 border-white border-opacity-0 object-cover transition-opacity duration-300"
                    />
                    <div className="absolute left-2 top-2 inline-block rounded-full bg-gray-1 text-primary">
                        <TypeTag tagName={product.genre ?? ''} />
                    </div>
                    {/* Border-primary with blur effect */}
                    <div className="absolute inset-0 rounded-lg border-4 border-primary border-opacity-0 blur-sm transition-opacity duration-300 hover:border-opacity-100"></div>
                </div>
            </Link>
            <div className="text-start">
                <h5 className="w-full overflow-hidden text-ellipsis text-nowrap text-btn1 font-medium text-white">
                    {product.title}
                </h5>
                <div className="text-small2 font-regular">
                    <p className="mb-4 text-gray-5">
                        {truncateBrief(product.brief ?? '')}
                    </p>
                    <div className="flex items-center text-white md:space-x-3">
                        <TypeTag tagName={product.type} />
                        <Tag
                            icon={FaMapMarkerAlt}
                            tagValue={product.theater ?? ''}
                            iconColor="gray-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
