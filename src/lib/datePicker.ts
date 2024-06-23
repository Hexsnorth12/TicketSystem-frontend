const today = new Date()
const later = new Date(today.getTime() + 86400000)

export const DEFAULTSTARTTIME = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
)
export const datePickerStaticData = {
    DEFAULTDATE: today,
    DEFAULTENDDATE: later,
    DEFAULTSTARTTIME: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
    ),
    DEFAULTENDTIME: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
    ),
    STARTDATETITLE: '開始日期',
    ENDDATETITLE: '結束日期',
}
