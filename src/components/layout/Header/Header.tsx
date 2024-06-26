'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MemberMenu } from '@/components/common'
import { CartModal } from '@/components/Cart/CartModal'
import Cartbtn from '../../Buttons/CartBtn'
import avatar from '@icon/avatar.svg'
import { signOut, useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/useCartStore'
import { useLazyGetInfoQuery } from '@/services/modules/user'

//FIXME: 在使用前定义 mapCartItemToProductInfo 函数

interface HeaderProps {
    logoSrc: string
    isAuth: boolean
    searchParams?: { [key: string]: string }
}

const Header: React.FC<HeaderProps> = ({ logoSrc }) => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const isAuth = !!session
    const LogOut = useCartStore((state) => state.LogOut)
    const [showCartModal, setShowCartModal] = useState(false)

    const [getInfo, { data: userInfo }] = useLazyGetInfoQuery()

    useEffect(() => {
        const getUserInfo = async () => {
            getInfo({ token: session?.accessToken ?? '' })
        }
        getUserInfo()
    }, [getInfo])

    const onLogout = async () => {
        setIsOpen(false)
        LogOut()
        signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
        })
    }
    function showCartModalHandler(show = false) {
        setShowCartModal(show)
    }

    const totalItems = useCartStore((state) => state.totalItems)
    const cart = useCartStore((state) => state.cart)
    const total = cart.reduce((acc, product) => {
        const selectedPlan = product.selectedPlan // 确保这里的 selectedPlan 是正确的
        const price = product.price ?? 0
        if (selectedPlan && selectedPlan.discount && selectedPlan.headCount) {
            return (
                acc +
                price *
                    selectedPlan.discount *
                    selectedPlan.headCount *
                    product.quantity
            )
        }
        // 如果没有折扣信息，按原价计算
        return acc + price * product.quantity
    }, 0)

    const handleClick = () => {
        setIsOpen(false)
    }
    return (
        <header className="fixed z-[99] w-full bg-gray-3 py-4">
            <div className="container relative flex items-center justify-between px-4">
                {/* Mobile-Navbar */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16m-7 6h7'
                                }></path>
                        </svg>
                    </button>
                </div>
                <Link href="/">
                    <Image
                        className="align-baseline"
                        src={logoSrc}
                        alt="My App Logo"
                        width={176}
                        height={72}
                    />
                </Link>
                <Link href="/cart" className="flex md:hidden">
                    <Cartbtn amount={totalItems ?? 0} />
                </Link>
                {/* Desktop-Navbar */}
                <nav className="hidden items-center space-x-4 md:flex">
                    <Link href="/generalMovies" onClick={handleClick}>
                        <p className="movies-link text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                            電影總表
                        </p>
                    </Link>
                    <Link href="/join" onClick={handleClick}>
                        <p className="text-white hover:border-b-2 hover:border-b-primary hover:text-primary">
                            一起揪團
                        </p>
                    </Link>
                    <div
                        className="relative"
                        onMouseEnter={() => showCartModalHandler(true)}
                        onMouseLeave={() => showCartModalHandler()}>
                        <Link href="/cart">
                            <Cartbtn amount={totalItems} />
                        </Link>
                        <CartModal
                            visible={showCartModal}
                            items={cart}
                            totalItems={totalItems}
                            total={total}
                            leaveModalHandler={() => showCartModalHandler()}
                        />
                    </div>
                    {!isAuth ? (
                        <Link href="/login" scroll={false}>
                            <div
                                className="inline-block rounded-full border px-4 py-2"
                                style={{ borderColor: '#00FFFF' }}>
                                <p className="text-white">會員登入</p>
                            </div>
                        </Link>
                    ) : (
                        <MemberMenu
                            userInfo={userInfo}
                            setIsExpand={setIsOpen}
                            isExpand={isOpen}
                            isAdmin={session.user.accountType === 'admin'}
                        />
                    )}
                </nav>
            </div>

            {/* Mobile-Sidebar */}
            <div
                className={`fixed mt-4 h-full w-[75%] transform bg-gray-2 transition-transform duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <nav className="flex flex-col space-y-4 p-4 text-center">
                    {isAuth && (
                        <ul className="right-0 top-auto rounded-lg bg-gray-1 p-4 text-center md:h-auto md:w-[160px]">
                            {isAuth && (
                                <div
                                    className={
                                        'mx-auto mb-4 h-[48px] w-[48px] rounded-full bg-gradient-to-b from-primary to-gray-6 p-[3px]'
                                    }>
                                    <Image
                                        src={userInfo?.imgUrl ?? avatar}
                                        alt="avatar"
                                        className={
                                            'h-full w-full rounded-full object-cover'
                                        }
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            )}
                            {session.user.accountType === 'admin' ? (
                                <li
                                    className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                    onClick={handleClick}>
                                    <Link
                                        href="/admin/order"
                                        scroll={false}
                                        className="cursor-pointer">
                                        後台管理
                                    </Link>
                                </li>
                            ) : null}
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link href="/user/info" scroll={false}>
                                    會員資料
                                </Link>
                            </li>
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link
                                    href="/user/tickets?status=unverified"
                                    scroll={false}>
                                    我的電影票
                                </Link>
                            </li>
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link href="/user/favorites" scroll={false}>
                                    我的收藏
                                </Link>
                            </li>
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link href="/user/comments" scroll={false}>
                                    我的評論
                                </Link>
                            </li>
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link href="/user/sharedTicket" scroll={false}>
                                    線上分票
                                </Link>
                            </li>
                            <li
                                className="border-b-2 border-gray-4 py-3 text-white hover:border-b-2 hover:border-b-primary hover:text-primary"
                                onClick={handleClick}>
                                <Link
                                    href="/user/join"
                                    scroll={false}
                                    className="cursor-pointer">
                                    我的揪團
                                </Link>
                            </li>
                        </ul>
                    )}
                    <Link
                        onClick={handleClick}
                        href="/generalMovies"
                        className="block cursor-pointer px-4 py-2  text-white hover:border-b-2 hover:border-b-primary hover:text-primary ">
                        電影總表
                    </Link>
                    <Link
                        onClick={handleClick}
                        href="/join"
                        className="block cursor-pointer px-4 py-2  text-white hover:border-b-2 hover:border-b-primary hover:text-primary ">
                        一起揪團
                    </Link>
                    {!isAuth && (
                        <Link
                            onClick={handleClick}
                            href="/login"
                            className="block cursor-pointer rounded-full border border-primary px-4 py-2 text-white hover:bg-primary hover:text-white "
                            scroll={false}>
                            會員登入
                        </Link>
                    )}
                    {isAuth && (
                        <Link
                            href="/login"
                            className="cursor-pointer rounded-full border border-primary py-3 text-white hover:bg-primary hover:text-white"
                            onClick={onLogout}>
                            會員登出
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
