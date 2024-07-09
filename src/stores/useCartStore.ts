import { create } from 'zustand'
import { CartItem } from '@/types/product'
import { UserCartItem } from '@/types/cart'
import { ProductPlan } from '@/types/product'
import { persist } from 'zustand/middleware'
import { getSession } from 'next-auth/react'
import fetchServer from '@/lib/fetchServer'

interface State {
    cart: CartItem[]
    totalItems: number
    totalPrice: number
}
interface Actions {
    addToCart: (
        product: CartItem,
        selectedPlan: ProductPlan,
        conter: number,
    ) => void
    removeFromCart: (product: CartItem, selectedPlan: ProductPlan) => void
    removeAllFromCart: (product: CartItem, selectedPlan: ProductPlan) => void
    updateCartItemQuantity: (
        product: string,
        selectedPlan: string,
        newQuantity: number,
    ) => void
    mergeCarts: (product: UserCartItem[]) => void
    LogOut: () => void
}

//初始化預設狀態
const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}
const session = getSession()
const isAuth = !!session
//使用 Zustand 創建商店，結合狀態介面和操作
export const useCartStore = create<State & Actions>()(
    persist(
        (set, get) => ({
            cart: INITIAL_STATE.cart,
            totalItems: INITIAL_STATE.totalItems,
            totalPrice: INITIAL_STATE.totalPrice,

            addToCart: (
                product: CartItem,
                selectedPlan: ProductPlan,
                conter: number,
            ) => {
                const { cart } = get()
                const cartItemIndex = cart.findIndex(
                    (item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name,
                )

                if (cartItemIndex !== -1) {
                    const updatedCart = [...cart]
                    updatedCart[cartItemIndex] = {
                        ...updatedCart[cartItemIndex],
                        quantity: updatedCart[cartItemIndex].quantity + conter,
                    }

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + conter,
                        totalPrice: updatedCart.reduce((acc, item) => {
                            const itemPrice =
                                (item.price as number) *
                                item.selectedPlan.discount
                            return acc + itemPrice * item.quantity
                        }, 0),
                    }))
                } else {
                    const updatedCart = [
                        ...cart,
                        { ...product, quantity: conter, selectedPlan },
                    ]

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + conter,
                        totalPrice: updatedCart.reduce((acc, item) => {
                            const itemPrice =
                                (item.price as number) *
                                item.selectedPlan.discount
                            return acc + itemPrice * item.quantity
                        }, 0),
                    }))
                }
                const newItem = {
                    products: [
                        {
                            productId: product._id,
                            plan: selectedPlan,
                            type: 'inc',
                            amount: conter,
                        },
                    ],
                }
                if (isAuth) {
                    fetchServer({
                        method: 'PATCH',
                        url: `api/v1/cart`,
                        body: JSON.stringify(newItem),
                    })
                }
            },

            removeFromCart: (product: CartItem, selectedPlan: ProductPlan) => {
                const { cart } = get()
                const cartItemIndex = cart.findIndex(
                    (item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name,
                )

                if (cartItemIndex !== -1) {
                    const updatedCart = [...cart]
                    if (updatedCart[cartItemIndex].quantity > 1) {
                        updatedCart[cartItemIndex] = {
                            ...updatedCart[cartItemIndex],
                            quantity: updatedCart[cartItemIndex].quantity - 1,
                        }
                    } else {
                        updatedCart.splice(cartItemIndex, 1)
                    }

                    set(() => ({
                        cart: updatedCart,
                        totalItems: updatedCart.reduce(
                            (acc, item) => acc + item.quantity,
                            0,
                        ),
                        totalPrice: updatedCart.reduce((acc, item) => {
                            const itemPrice =
                                (item.price as number) *
                                item.selectedPlan.discount
                            return acc + itemPrice * item.quantity
                        }, 0),
                    }))
                }
                const newItem = {
                    products: [
                        {
                            productId: product._id,
                            plan: selectedPlan,
                            type: 'inc',
                            amount: -1,
                        },
                    ],
                }
                if (isAuth) {
                    fetchServer({
                        method: 'PATCH',
                        url: `api/v1/cart`,
                        body: JSON.stringify(newItem),
                    })
                }
            },

            removeAllFromCart: (
                product: CartItem,
                selectedPlan: ProductPlan,
            ) => {
                const { cart } = get()
                const updatedCart = cart.filter(
                    (item: CartItem) =>
                        item._id !== product._id ||
                        item.selectedPlan.name !== selectedPlan.name,
                )

                const cartItem = cart.find(
                    (item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name,
                )

                if (cartItem) {
                    set(() => ({
                        cart: updatedCart,
                        totalItems: updatedCart.reduce(
                            (acc, item) => acc + item.quantity,
                            0,
                        ),
                        totalPrice: updatedCart.reduce((acc, item) => {
                            const itemPrice =
                                (item.price as number) *
                                item.selectedPlan.discount
                            return acc + itemPrice * item.quantity
                        }, 0),
                    }))
                    const newItem = {
                        type: 'items',
                        products: [
                            {
                                productId: product._id,
                                plan: selectedPlan,
                            },
                        ],
                    }
                    if (isAuth) {
                        fetchServer({
                            method: 'DELETE',
                            url: `api/v1/cart`,
                            body: JSON.stringify(newItem),
                        })
                    }
                }
            },

            updateCartItemQuantity: (
                productId: string,
                planName: string,
                newQuantity: number,
            ) => {
                const { cart } = get()
                const cartItemIndex = cart.findIndex(
                    (item: CartItem) =>
                        item._id === productId &&
                        item.selectedPlan.name === planName,
                )

                if (cartItemIndex !== -1) {
                    const updatedCart = [...cart]
                    const currentItem = updatedCart[cartItemIndex]
                    updatedCart[cartItemIndex] = {
                        ...currentItem,
                        quantity: newQuantity,
                    }

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: updatedCart.reduce(
                            (acc, item) => acc + item.quantity,
                            0,
                        ),
                        totalPrice: state.cart.reduce((acc, item) => {
                            const itemPrice =
                                (item.price as number) *
                                item.selectedPlan.discount
                            return acc + itemPrice * item.quantity
                        }, 0),
                    }))
                    // 將 `selectedPlan` 設置為 `currentItem.selectedPlan`
                    const selectedPlan = currentItem.selectedPlan

                    // 構造新的購物車項目結構
                    const newItem = {
                        products: [
                            {
                                productId: productId,
                                plan: selectedPlan,
                                type: 'set',
                                amount: newQuantity, // 使用新的數量
                            },
                        ],
                    }

                    // 檢查是否認證，然後發送 PATCH 請求
                    if (isAuth) {
                        fetchServer({
                            method: 'PATCH',
                            url: `api/v1/cart`,
                            body: JSON.stringify(newItem),
                        })
                    }
                }
            },

            mergeCarts: (serverCart: UserCartItem[]) => {
                const { cart } = get()
                const mergedCart = [...cart]

                // 合併服務器和客戶端的購物車
                serverCart.forEach((serverItem: UserCartItem) => {
                    const formattedItem = {
                        ...serverItem.product,
                        selectedPlan: serverItem.plan,
                        quantity: serverItem.amount,
                    }

                    // 查找合併購物車中是否存在同一個產品和計劃
                    const index = mergedCart.findIndex(
                        (item) =>
                            item._id === formattedItem._id &&
                            item.selectedPlan.name ===
                                formattedItem.selectedPlan.name,
                    )

                    if (index !== -1) {
                        // 如果存在，增加其數量
                        mergedCart[index] = {
                            ...mergedCart[index],
                            quantity:
                                mergedCart[index].quantity +
                                formattedItem.quantity,
                        }
                    } else {
                        // 否則，添加到合併購物車中
                        mergedCart.push(formattedItem)
                    }
                })

                // 更新狀態：合併後的購物車、總數量和總價格
                set(() => ({
                    cart: mergedCart,
                    totalItems: mergedCart.reduce(
                        (acc, item) => acc + item.quantity,
                        0,
                    ),
                    totalPrice: mergedCart.reduce((acc, item) => {
                        const itemPrice =
                            (item.price as number) * item.selectedPlan.discount
                        return acc + itemPrice * item.quantity
                    }, 0),
                }))

                // 構造要同步到服務器的新購物車數據
                const newItems = mergedCart.map((item) => ({
                    productId: item._id,
                    plan: item.selectedPlan,
                    type: 'set',
                    amount: item.quantity,
                }))

                // 如果用戶已認證，則發送 API 請求
                if (isAuth) {
                    fetchServer({
                        method: 'PATCH',
                        url: `api/v1/cart`,
                        body: JSON.stringify({ products: newItems }),
                    })
                }
            },
            LogOut: () => {
                set(INITIAL_STATE)
            },
        }),
        {
            name: 'cart-storage', // 本地存儲的 key
        },
    ),
)
