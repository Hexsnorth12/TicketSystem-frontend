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
