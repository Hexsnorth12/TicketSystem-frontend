'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { IoCartOutline } from 'react-icons/io5'
import { CiHeart } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import Button from '@components/common/Button'
import MovieTag from '../MovieTag/MovieTag'
import star from '@icon/star_gray.svg'
import { bellota } from '../../fonts'
import Counter from '../Counter/Counter'
import Tag from '../Tag/tag'
import { ProductDetail, ProductPlan, CartItem } from '@/types'
import { useCartStore } from '@/stores/useCartStore'
import {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} from '@/services/modules/user'
import { useAlert } from '@/components/useAlert/useAlert'
interface CardProps {
    product: ProductDetail
}

const MovieDetailCard: React.FC<CardProps> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(product?.isFavorite || false)
    const [addFavorite, { isLoading }] = useAddFavoriteMutation()
    const [removeFavorite, { isLoading: isLoadingRemove }] =
        useRemoveFavoriteMutation()
    const { data: session } = useSession()

    const initialPlan = product.plans[0] || {}
    const [selectPlan, setSelectPlan] = useState<ProductPlan>(initialPlan)

    // 初始价格计算
    const initialPrice = product.price
        ? product.price * initialPlan.discount * initialPlan.headCount
        : 0
    const [selectPrice, setSelectPrice] = useState(initialPrice)
    const [conter, setConter] = useState(1)
    const showAlert = useAlert()
    const handleConterClick = (value: number) => {
        setConter(value)
    }
    // 处理方案选择
    const handleSelectPlanClick = (
        product: ProductDetail,
        selectedPlan: ProductPlan,
    ) => {
        setSelectPlan(selectedPlan)
        setSelectPrice(
            product.price !== undefined
                ? product.price * selectedPlan.discount * selectedPlan.headCount
                : 0,
        )
        setConter(1)
    }

    const handleOnclick = () => {
        const cartItem: CartItem = {
            ...product,
            quantity: conter,
            selectedPlan: selectPlan,
        }
        addToCart(cartItem, selectPlan, conter)
    }
    const addToCart = useCartStore((state) => state.addToCart)
    const handleUpdateFavorite = async () => {
        if (!session) {
            showAlert('登入後收藏', 'warning')
            return
        }
        if (!isFavorite) {
            try {
                setIsFavorite(true)
                await addFavorite({
                    productId: product._id,
                    token: session?.accessToken ?? '',
                }).unwrap()
            } catch (error) {
                setIsFavorite(false)
            }
        } else {
            try {
                setIsFavorite(false)
                await removeFavorite({
                    productId: product._id,
                    token: session?.accessToken ?? '',
                }).unwrap()
            } catch (error) {
                setIsFavorite(true)
            }
        }
    }
    const plans = useMemo(() => {
        return product.plans.map((item, index) => (
            <Button
                key={index}
                type="button"
                title="按钮"
                onClick={() => handleSelectPlanClick(product, item)}
                className={`text-nowrap py-2 focus:outline-none md:px-4 md:py-2 ${
                    selectPlan.name === item.name ? 'bg-primary text-black' : ''
                }`}>
                <span>{item.name}</span>
            </Button>
        ))
    }, [product.plans.length, selectPlan])

    return (
        <div className="relative h-full w-full">
            <div className="relative h-[312px] md:h-[600px]">
                {/* Background Image with Blur */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={product.photoPath}
                        alt="product image"
                        layout="fill"
                        objectFit="cover"
                        quality={20}
                        className="blur-xl"
                        style={{ opacity: 0.5 }}
                    />
                </div>
                {/* Gradient Overlay */}
                <div className=" absolute inset-0 z-10 bg-gradient-to-t  to-transparent"></div>
                {/* Content */}
                <div className="relative inset-0 flex h-full items-center justify-center bg-cover bg-center md:absolute md:inline-flex md:hidden">
                    <Image
                        src={product.photoPath}
                        alt={'product image'}
                        width={200}
                        height={264}
                        objectFit="contain"
                        className="rounded-lg transition-opacity duration-300"
                    />
                </div>
                <div className="relative z-20 grid h-full grid-flow-col grid-rows-6 content-center gap-4 px-4 md:px-0">
                    <div className="row-span-6 hidden items-center justify-center md:inline-flex">
                        <Image
                            src={product.photoPath}
                            alt="product image"
                            width={360}
                            height={480}
                            objectFit="contain"
                            className="rounded-lg transition-opacity duration-300"
                        />
                    </div>
                    <div className="col-span-1 row-span-1 flex items-center justify-start">
                        <div className="flex items-center justify-center gap-x-2">
                            <MovieTag label="科幻類" />
                            <Image
                                src={star}
                                alt="star"
                                width={20}
                                height={20}
                            />
                            <div className={bellota.className}>
                                <p className="leading-1.5 text-number5 font-bold text-white md:text-number4">
                                    {3}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1 flex items-center justify-start border-b-[1px] border-white md:col-span-1">
                        <div className="text-headline5 text-white md:text-header2 md:font-bold">
                            {product.title}
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1 flex items-center justify-start md:col-span-1">
                        <div className="flex">
                            <div className={bellota.className}>
                                <div className="flex items-center justify-center gap-x-2 text-center">
                                    <span className="leading-1.5 text-number5 font-bold text-gray-5 md:text-number4">
                                        NT$
                                    </span>
                                    <span className="leading-1.5 text-number4 font-bold text-primary md:text-number3">
                                        {selectPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 row-span-1">
                        <div className="text-small2 font-regular text-gray-5 md:text-small1">
                            商品規格
                        </div>
                        <div className="mt-3 flex gap-x-2 md:mt-4">{plans}</div>
                    </div>
                    <div className="col-span-2 row-span-1 mt-8 md:col-span-1">
                        <div className="mt-4 flex flex-col items-center gap-y-2 md:flex-row md:justify-start md:gap-x-2">
                            <div className="w-full md:basis-1/5">
                                <Counter
                                    onValueChange={handleConterClick}
                                    initialValue={conter}
                                    minValue={1}
                                    maxValue={999}
                                />
                            </div>
                            <div className="flex w-full gap-3 md:basis-4/5">
                                <div className="flex-1">
                                    <Button
                                        type="button"
                                        title="按钮"
                                        onClick={handleOnclick}
                                        className="flex w-full items-center justify-center py-2 text-center">
                                        <Tag
                                            icon={IoCartOutline}
                                            tagValue="加入購物車"
                                            iconColor="inherit"
                                        />
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <Button
                                        type="button"
                                        title="按钮"
                                        onClick={handleUpdateFavorite}
                                        className="flex w-full items-center justify-center py-2 text-center"
                                        disabled={isLoading || isLoadingRemove}>
                                        <Tag
                                            icon={
                                                isFavorite ? FaHeart : CiHeart
                                            }
                                            tagValue="收藏"
                                            iconColor="inherit"
                                        />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailCard
