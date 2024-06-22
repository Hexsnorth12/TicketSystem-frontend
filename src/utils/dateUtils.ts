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

export function formatDate(date: Date, formatType = '.') {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const eventDate = date.getDate()
    return `${year}${formatType}${month}${formatType}${eventDate}`
}

export function formatJoinEventDate(date: Date) {
    const eventDate = formatDate(date)
    const time = formatTimeString(date)
    return `${eventDate} ${time}`
}

export function checkInvalidTimeRange(start: Date, end: Date) {
    return (
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            start.getHours(),
            start.getMinutes(),
        ) >
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            end.getHours(),
            end.getMinutes(),
        )
    )
}

export function exportTimeRangeString({
    startDate,
    endDate,
    startTime,
    endTime,
}: {
    startDate: Date
    endDate: Date
    startTime: Date
    endTime: Date
}) {
    const startAt = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
    ).toLocaleString()
    const endAt = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
    ).toLocaleString()
    const timeBegin = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        startTime.getHours(),
        startTime.getMinutes(),
    ).toLocaleString()
    const timeEnd = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        endTime.getHours(),
        endTime.getMinutes(),
    ).toLocaleString()
    return { startAt, endAt, timeBegin, timeEnd }
}
