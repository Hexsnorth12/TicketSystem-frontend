import fetchClient from './fetchClient'

import type { EventDetailRes, GetEventListRes, JoinEventRes } from '@/types'

const today = new Date()
const later = new Date(today.getTime() + 86400000)
export const DEFAULTTIMERANGE = {
    startDate: today,
    endDate: later,
    startTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
    ),
    endTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        23,
        59,
    ),
}

export const getJoinEventList = async ({
    limit,
    page,
    startAt = '',
    endAt = '',
    timeBegin = '',
    timeEnd = '',
    movieTitle = '',
    title = '',
}: {
    limit: number
    page: number
    startAt?: string
    endAt?: string
    timeBegin?: string
    timeEnd?: string
    movieTitle?: string
    title?: string
}): Promise<GetEventListRes> => {
    try {
        // 初次render拿全部活動資料前20筆資料
        const queryString = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            startDate: startAt,
            endDate: endAt,
            startTime: timeBegin,
            endTime: timeEnd,
            movieTitle,
            title,
            status: 'ongoing',
        })
        const url = `api/v1/group?${queryString.toString()}`

        const result = await fetchClient({ method: 'GET', url })
        const { status, data } = result

        if (status === '6000') {
            if (data.groups) {
                return {
                    status: 'success',
                    events: data.groups,
                    totalCount: data.totalCount,
                }
            }
        } else {
            throw new Error('取得活動資料失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message,
        }
    }
}

export const getEventDetail = async (
    eventId: string,
): Promise<EventDetailRes> => {
    try {
        const url = `api/v1/group/${eventId}`

        const result = await fetchClient({ method: 'GET', url })
        const { status, data } = result

        if (status === '6000') {
            if (data) {
                return {
                    status: 'success',
                    data,
                }
            }
        } else {
            throw new Error('取得活動資料失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message,
        }
    }
}

export const getMyJoinEventList = async (
    type: string,
    page: number,
): Promise<GetEventListRes> => {
    try {
        const result = await fetchClient({
            method: 'GET',
            url: `api/v1/user/groups?groupType=${type}&page=${page}`,
        })
        const { status, data } = result

        if (status === '6000') {
            if (data.groups) {
                return {
                    status: 'success',
                    events: data.groups,
                    totalCount: data.totalCount,
                }
            }
        } else {
            throw new Error('取得活動資料失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message,
        }
    }
}

export const createJoinEvent = async (eventInfo: {
    title: string
    placeholderImg: string
    theater: string
    movieTitle: string
    time: Date | string
    amount: number
    haveTicket: boolean
    content: string
    participant: {
        name: string
        nickname: string
        phone: string
        lineId: string
    }
}): Promise<JoinEventRes> => {
    try {
        const url = `api/v1/group`

        const result = await fetchClient({
            method: 'POST',
            url,
            body: JSON.stringify(eventInfo),
        })
        const { status, data } = result

        if (status === '6000') {
            return {
                status: 'success',
                message: '建立活動成功！',
            }
        } else {
            throw new Error('建立活動失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message || '系統錯誤，請再試一次',
        }
    }
}

export const updateEvent = async (
    groupId: string,
    updateInfo: { title: string; content: string },
): Promise<JoinEventRes> => {
    try {
        const url = `api/v1/group/${groupId}`

        const result = await fetchClient({
            method: 'PATCH',
            url,
            body: JSON.stringify(updateInfo),
        })
        const { status } = result

        if (status === '6000') {
            return {
                status: 'success',
                message: '修改成功',
            }
        } else {
            throw new Error('修改失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message || '系統錯誤，請再試一次',
        }
    }
}

export const leaveEvent = async (groupId: string): Promise<JoinEventRes> => {
    try {
        const url = `api/v1/group/leave/${groupId}`

        const result = await fetchClient({
            method: 'PATCH',
            url,
        })
        const { status } = result

        if (status === '6000') {
            return {
                status: 'success',
                message: '退出活動成功',
            }
        } else {
            throw new Error('退出活動失敗')
        }
        // eslint-disable-next-line
    } catch (error: any) {
        return {
            status: 'failed',
            error: error.message || '系統錯誤，請再試一次',
        }
    }
}
