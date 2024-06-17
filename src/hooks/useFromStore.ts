import { useEffect, useState } from 'react'

export default function useFromStore<T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    storeCallback: (state: T) => F,
    initialState: F, // 新增一个参数用于设置初始值
) {
    const [state, setState] = useState<F>(initialState) // 使用传入的初始值

    const stateOfStore = store(storeCallback) as F

    useEffect(() => {
        setState(stateOfStore)
    }, [stateOfStore])

    return state
}
