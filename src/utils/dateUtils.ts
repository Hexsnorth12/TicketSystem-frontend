export function formatDateString(date: Date) {
    return date.toLocaleDateString().replaceAll('/', '.')
}

export function formatTimeString(date: Date) {
    const minutes = date.getMinutes()
    let hours: number | string = date.getHours()
    if (hours < 10) hours = '0' + hours
    return `${hours}:${minutes}`
}
