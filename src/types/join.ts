export type FilterOption = {
    title: string
    filter: React.ReactNode
}

export type JoinEventParticipant = {
    userId: string
    phone: string
    name: string
    nickname: string
    lineId: string
}

export type Event = {
    _id?: string
    title: string
    placeholderImg: string
    theater: string
    time: string
    haveTicket?: boolean
    amount: number
    vacancy?: number
    content?: string
    movieTitle: string
    onClick: () => void
    participant?: {
        name: string
        nickname: string
        phone: string
        lineId: string
    }[]
    // eslint-disable-next-line
    [key: string]: any
}

type Status = 'success' | 'failed'

export type Tag = { label: string; value: string }

export type EventList = Event[] | []

export type JoinPageSuccess = {
    status: Status
    events: EventList
    totalCount: number
}

export type JoinPageError = {
    status: Status
    error: string
}

export type EventDetailSuccess = {
    status: Status
    data: Event
}

export type JoinEventSuccess = {
    status: Status
    message: string
}

export type GetEventListRes = JoinPageSuccess | JoinPageError | undefined
export type EventDetailRes = EventDetailSuccess | JoinPageError | undefined
export type JoinEventRes = JoinEventSuccess | JoinPageError | undefined
