import { create } from 'zustand'
import { CartItem } from '@/types/product'
import { UserCartItem } from '@/types/cart'
import { ProductPlan } from '@/types/product'
import { persist } from 'zustand/middleware'
import fetchClient from '@/lib/fetchClient'
import { getSession } from 'next-auth/react'
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
                {
                    isAuth &&
                        fetchClient({
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
                {
                    isAuth &&
                        fetchClient({
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
                }
                const newItem = {
                    products: [
                        {
                            productId: product._id,
                            plan: selectedPlan,
                            type: 'set',
                            amount: 0,
                        },
                    ],
                }
                {
                    isAuth &&
                        fetchClient({
                            method: 'PATCH',
                            url: `api/v1/cart`,
                            body: JSON.stringify(newItem),
                        })
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
                    const oldQuantity = currentItem.quantity
                    updatedCart[cartItemIndex] = {
                        ...currentItem,
                        quantity: newQuantity,
                    }
                    // Remove item if quantity is zero
                    if (newQuantity === 0) {
                        updatedCart.splice(cartItemIndex, 1)
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
                }
                const newItem = {
                    products: [
                        {
                            productId: productId,
                            plan: selectedPlan,
                            type: 'set',
                            amount: 0,
                        },
                    ],
                }
                {
                   ( isAuth && oldQuantity !== newQuantity){
                       fetchClient({
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

                serverCart.forEach((serverItem: UserCartItem) => {
                    const formattedItem = {
                        ...serverItem.product,
                        selectedPlan: serverItem.plan,
                        quantity: serverItem.amount,
                    }
                    console.log(formattedItem, 'formattedItemformattedItem')

                    const index = mergedCart.findIndex(
                        (item) =>
                            item._id === formattedItem._id &&
                            item.selectedPlan.name ===
                                formattedItem.selectedPlan.name,
                    )

                    if (index !== -1) {
                        mergedCart[index] = {
                            ...mergedCart[index],
                            quantity:
                                mergedCart[index].quantity +
                                formattedItem.quantity,
                        }
                    } else {
                        mergedCart.push(formattedItem)
                    }
                    console.log(formattedItem, 'formattedItem')
                    console.log(mergedCart, 'mergedCart')
                })

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
            },
        }),
        {
            name: 'cart-storage',
        },
    ),
)
