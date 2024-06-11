export const truncateName = (name: string): string => {
    if (name && name.length > 5) {
        return name.slice(0, 5) + '...'
    }
    return name
}

export const truncateContent = (content: string): string => {
    if (content && content.length > 12) {
        return content.slice(0, 12) + '...'
    }
    return content
}

export const truncateContentMobile = (content: string): string => {
    if (content && content.length > 7) {
        return content.slice(0, 7) + '...'
    }
    return content
}
