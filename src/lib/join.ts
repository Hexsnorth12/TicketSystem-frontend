import fetchClient from './fetchClient'

import type { EventDetailRes, GetEventListRes } from '@/types'

export const DEFAULTTIMERANGE = {
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
}

export const getJoinEventList = async ({
    limit,
    page,
    // eslint-disable-next-line
    startAt = '',
    // eslint-disable-next-line
    endAt = '',
    // eslint-disable-next-line
    movieTitle = '',
    title = '',
}: {
    limit: number
    page: number
    startAt?: string
    endAt?: string
    movieTitle?: string
    title?: string
}): Promise<GetEventListRes> => {
    try {
        // 初次render拿全部活動資料前20筆資料
        const queryString = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            // TODO: 待api更新
            // startAt,
            // endAt,
            // movieTitle,
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
