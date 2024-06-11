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
    addToCart: (product: ProductDetail, selectedPlan?: ProductPlan) => void
    removeFromCart: (product: ProductDetail) => void
}

//初始化預設狀態
const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}
//使用 Zustand 創建商店，結合狀態介面和操作
export const useCartStore = create(
    persist<State & Actions>(
        (set, get) => ({
            cart: INITIAL_STATE.cart,
            totalItems: INITIAL_STATE.totalItems,
            totalPrice: INITIAL_STATE.totalPrice,
            addToCart: (product: ProductDetail, selectedPlan?: ProductPlan) => {
                const cart = get().cart
                const cartItem = cart.find(
                    (item) =>
                        item._id === product._id &&
                        item.selectedPlan?.name === selectedPlan?.name,
                )

                // If the item already exists in the Cart, increase its quantity
                if (cartItem) {
                    const updatedCart = cart.map((item) =>
                        item._id === product._id &&
                        item.selectedPlan?.name === selectedPlan?.name
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    )
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice:
                            state.totalPrice +
                            product.price * (selectedPlan?.discount || 1),
                    }))
                } else {
                    const updatedCart = [
                        ...cart,
                        { ...product, quantity: 1, selectedPlan },
                    ]

                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice:
                            state.totalPrice +
                            product.price * (selectedPlan?.discount || 1),
                    }))
                }
            },
            removeFromCart: (product: ProductDetail) => {
                const { cart } = get()
                const cartItem = cart.find((item) => item._id === product._id)

                if (cartItem) {
                    let updatedCart = cart
                    if (cartItem.quantity > 1) {
                        updatedCart = cart.map((item) =>
                            item._id === product._id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item,
                        )
                    } else {
                        updatedCart = cart.filter(
                            (item) => item._id !== product._id,
                        )
                    }
                    set((state) => ({
                        cart: updatedCart,
                        totalItems: state.totalItems - 1,
                        totalPrice:
                            state.totalPrice -
                            product.price *
                                (cartItem.selectedPlan?.discount || 1),
                    }))
                }
            },
        }),
        {
            name: 'cart-storage',
            // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
            // version: 1, // State version number,
            // migrate: (persistedState: unknown, version: number) => {
            // 	if (version === 0) {
            // 		// if the stored value is in version 0, we rename the field to the new name
            // 		persistedState.totalProducts = persistedState.totalItems
            // 		delete persistedState.totalItems
            // 	}

            // 	return persistedState as State & Actions
            // },
        },
    ),
)
