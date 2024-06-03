export type DatePickerModal = {
    visible: boolean
    value: Date
    defaultValue: Date
    title: string
    onClose: () => void
    onChange: (date: Date) => void
}
