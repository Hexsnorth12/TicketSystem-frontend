// store/productStore.ts
import create from 'zustand'
import { ProductDetail } from '@/types/index'

interface ProductState {
    productDetail: ProductDetail | null
    setProductDetail: (productDetail: ProductDetail) => void
    clearProductDetail: () => void
}

const useProductStore = create<ProductState>((set) => ({
    productDetail: null,
    setProductDetail: (productDetail) => set({ productDetail }),
    clearProductDetail: () => set({ productDetail: null }),
}))

export default useProductStore
