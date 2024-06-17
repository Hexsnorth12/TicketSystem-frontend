import { create } from 'zustand'
import { CartItem } from '@/types/product'
import { ProductPlan } from '@/types/product'
import { persist } from 'zustand/middleware'
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
    mergeCarts: (serverCart: CartItem[]) => void
}

//初始化預設狀態
const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}
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
                    updatedCart[cartItemIndex] = {
                        ...updatedCart[cartItemIndex],
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
                }
            },
            mergeCarts: (serverCart: CartItem[]) => {
                const { cart } = get()
                const mergedCart = [...cart]

                serverCart.forEach((serverItem) => {
                    const index = mergedCart.findIndex(
                        (item) =>
                            item._id === serverItem._id &&
                            item.selectedPlan.name ===
                                serverItem.selectedPlan.name,
                    )

                    if (index !== -1) {
                        mergedCart[index] = {
                            ...mergedCart[index],
                            quantity:
                                mergedCart[index].quantity +
                                serverItem.quantity,
                        }
                    } else {
                        mergedCart.push(serverItem)
                    }
                })

                set((state) => ({
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
