export const truncateName = (name: string): string => {
    if (name && name.length > 5) {
        return name.slice(0, 5) + '...'
    }
    return name
}

export const truncateContent = (content: string): string => {
    if (content && content.length > 8) {
        return content.slice(0, 8) + '...'
    }
    return content
}

export const truncateContentMobile = (content: string): string => {
    if (content && content.length > 7) {
        return content.slice(0, 7) + '...'
    }
    return content
}

export const truncateJoinEvent = (content: string): string => {
    if (content && content.length > 10) {
        return content.slice(0, 10) + '...'
    }
    return content
}

export const truncateBrief = (content: string): string => {
    if (content && content.length > 31) {
        return content.slice(0, 31) + '...'
    }
    return content
}

export const truncateTitle = (content: string): string => {
    if (content && content.length > 10) {
        return content.slice(0, 10) + '...'
    }
    return content
}
