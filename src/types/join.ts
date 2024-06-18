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
}

type Status = 'success' | 'failed'

export type Tag = { label: string; value: string }

// eslint-disable-next-line
export type EventList = [Event & { [key: string]: any }] | []

export type JoinPageSuccess = {
    status: Status
    data: EventList
}

export type JoinPageError = {
    status: Status
    error: string
}

export type EventDetailSuccess = {
    status: Status
    data: Event
}

export type GetEventListRes = JoinPageSuccess | JoinPageError | undefined
export type EventDetailRes = EventDetailSuccess | JoinPageError | undefined
