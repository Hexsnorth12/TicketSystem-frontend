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
    // TODO: 時間範圍邏輯不合理，需增設api request param
    console.log('start, end: ', startTime, endTime)
    const startAt = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes(),
    ).toLocaleString()
    const endAt = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes(),
    ).toLocaleString()
    return { startAt, endAt }
}
