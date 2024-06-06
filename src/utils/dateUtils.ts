export function formatDateString(date: Date) {
    return date.toLocaleDateString().replaceAll('/', '.')
}

export function formatTimeString(date: Date) {
    let hours: number | string = date.getHours()
    let minutes: number | string = date.getMinutes()
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    return `${hours}:${minutes}`
}
