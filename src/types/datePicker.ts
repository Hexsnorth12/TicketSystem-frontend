export type DatePickerModal = {
    visible: boolean
    value: Date
    defaultValue: Date
    title: string
    onClose: () => void
    onChange: (date: Date) => void
}

export type DatePickerInput = {
    defaultValue: Date
    dateString: string
    onClick: () => void
}

export type TimePickerInput = {
    defaultValue: Date
    timeString: string
    onChange: (date: Date) => void
}
