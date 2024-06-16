import { create } from 'zustand'
import { CartItem } from '@/types/product'
import { ProductDetail, ProductPlan } from '@/types/product'
import { persist } from 'zustand/middleware'
interface State {
    cart: CartItem[]
    totalItems: number
    totalPrice: number
}
interface Actions {
    addToCart: (
        product: ProductDetail,
        selectedPlan: ProductPlan,
        conter: number,
    ) => void
    removeFromCart: (product: ProductDetail) => void
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
                product: ProductDetail,
                selectedPlan: ProductPlan,
                conter: number,
            ) => {
                const { cart } = get()
                const cartItem = cart.find(
                    (item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name,
                )

                if (cartItem) {
                    const updatedCart = cart.map((item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name
                            ? { ...item, quantity: item.quantity + conter }
                            : item,
                    )
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + conter,
                        totalPrice:
                            state.totalPrice +
                            (product.price as number) * selectedPlan.discount,
                    }))
                } else {
                    const updatedCart = [
                        ...cart,
                        { ...product, quantity: conter, selectedPlan },
                    ]

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + conter,
                        totalPrice:
                            state.totalPrice +
                            (product.price as number) * selectedPlan.discount,
                    }))
                }
            },
            removeFromCart: (
                product: ProductDetail,
                selectedPlan: ProductPlan,
            ) => {
                const { cart } = get()
                const cartItem = cart.find(
                    (item: CartItem) =>
                        item._id === product._id &&
                        item.selectedPlan.name === selectedPlan.name,
                )
                if (cartItem) {
                    let updatedCart = cart
                    if (cartItem.quantity > 1) {
                        updatedCart = cart.map((item: CartItem) =>
                            item._id === product._id &&
                            item.selectedPlan.name === selectedPlan.name
                                ? { ...item, quantity: item.quantity - 1 }
                                : item,
                        )
                    } else {
                        updatedCart = cart.filter(
                            (item: CartItem) =>
                                item._id !== product._id ||
                                item.selectedPlan.name !== selectedPlan.name,
                        )
                    }
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems - 1,
                        totalPrice:
                            state.totalPrice -
                            (product.price as number) * selectedPlan.discount,
                    }))
                }
            },
        }),
        {
            name: 'cart-storage',
        },
    ),
)
