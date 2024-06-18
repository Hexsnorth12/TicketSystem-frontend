import { useEffect } from 'react'

export const useScrollToBottom = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
) => {
    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleScroll = () => {
            const scrollTop = element.scrollTop
            const scrollHeight = element.scrollHeight
            const clientHeight = element.clientHeight

            if (scrollTop + clientHeight >= scrollHeight) {
                callback()
            }
        }

        element.addEventListener('scroll', handleScroll)

        return () => {
            element.removeEventListener('scroll', handleScroll)
        }
    }, [ref, callback])
}
