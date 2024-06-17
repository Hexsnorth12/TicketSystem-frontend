const today = new Date()

export const DEFAULTSTARTTIME = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
)
export const datePickerStaticData = {
    DEFAULTDATE: today,
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
