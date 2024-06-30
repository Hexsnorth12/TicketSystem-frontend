'use client'

import React, { useState, useRef } from 'react'
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd'
import { DatePicker } from '@mui/x-date-pickers'
import { styled } from '@mui/material'

const CustomizeDatePickerInput = styled(DatePicker)`
    .MuiInputBase-root {
        box-shadow: var(--tw-ring-inset) 0 0 0
            calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        --tw-ring-color: rgb(51 51 51);
        flex-grow: 1;
    }

    .MuiInputBase-input {
        color: #fff;
        font-weight: normal;
        align-self: center;
        padding: 14px 0px 14px 0px;
        outline: none;
    }

    .MuiSvgIcon-root {
        color: #4e4e4e;
    }
    .MuiInputLabel-root {
        color: #fff;
    }
`

import {
    DragItem,
    DataShell,
    Button,
    InputComponent,
} from '@/components/common'
import { InputItem } from '@/types/table'

const initValue = [
    {
        id: 'item1',
        content: '',
    },
]

interface Props {}

const Page: React.FC<Props> = () => {
    const [items, setItems] = useState([
        {
            id: 'item1',
            content: '深入參觀雪梨歌劇院，欣賞全球最大的無梁拱形天花板',
        },
        {
            id: 'item2',
            content: '聆聽導覽，了解雪梨歌劇院富有戲劇性的豐富歷史',
        },
        // ... 其他項目
    ])
    const [notifications, setNotifications] = useState<InputItem[]>(initValue)
    const [highlights, setHighlights] = useState<InputItem[]>(initValue)
    const [cautions, setCautions] = useState<InputItem[]>(initValue)
    const [confirmations, setConfirmations] = useState<InputItem[]>(initValue)
    const [cancelPolicies, setCancelPolicies] = useState<InputItem[]>(initValue)
    const [certificates, setCertificates] = useState<InputItem[]>(initValue)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const onDragEnd = (result: DropResult, type: string) => {
        if (!result.destination) {
            return
        }
        const reorder = (
            list: InputItem[],
            startIndex: number,
            endIndex: number,
        ) => {
            const result = Array.from(list)
            const [removed] = result.splice(startIndex, 1)
            result.splice(endIndex, 0, removed)
            return result
        }

        const updateFunctions: {
            [key: string]: React.Dispatch<React.SetStateAction<InputItem[]>>
        } = {
            notification: setNotifications,
            highlight: setHighlights,
            caution: setCautions,
            confirmation: setConfirmations,
            cancelPolicy: setCancelPolicies,
            certificate: setCertificates,
        }

        const updateFunction = updateFunctions[type]
        if (updateFunction) {
            updateFunction((prevItems) => {
                const items = reorder(
                    prevItems,
                    result.source.index,
                    result.destination!.index,
                )
                return items
            })
        }
    }

    const handleCreateDragItem = (type: string) => {
        const createItem = (prevItems: InputItem[]) => {
            return [
                ...prevItems,
                {
                    id: `item${prevItems.length + 1}`,
                    content: '',
                },
            ]
        }
        const updateFunctions: {
            [key: string]: React.Dispatch<React.SetStateAction<InputItem[]>>
        } = {
            notification: setNotifications,
            highlight: setHighlights,
            caution: setCautions,
            confirmation: setConfirmations,
            cancelPolicy: setCancelPolicies,
            certificate: setCertificates,
        }

        const updateFunction = updateFunctions[type]
        if (updateFunction) {
            updateFunction((prevItems) => createItem(prevItems))
        }
    }

    const handleDeleteDragItem = (type: string, id: string) => {
        const deleteItem = (prevItems: InputItem[]) =>
            prevItems.filter((item) => item.id !== id)

        const updateFunctions: {
            [key: string]: React.Dispatch<React.SetStateAction<InputItem[]>>
        } = {
            notification: setNotifications,
            highlight: setHighlights,
            caution: setCautions,
            confirmation: setConfirmations,
            cancelPolicy: setCancelPolicies,
            certificate: setCertificates,
        }

        const updateFunction = updateFunctions[type]
        if (updateFunction) {
            updateFunction((prevItems) => deleteItem(prevItems))
        }
    }

    const handleChange = (type: string, value: string, id: string) => {
        const updateItem = (prevItems: InputItem[]) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, content: value } : item,
            )

        const updateFunctions: {
            [key: string]: React.Dispatch<React.SetStateAction<InputItem[]>>
        } = {
            notification: setNotifications,
            highlight: setHighlights,
            caution: setCautions,
            confirmation: setConfirmations,
            cancelPolicy: setCancelPolicies,
            certificate: setCertificates,
        }

        const updateFunction = updateFunctions[type]
        if (updateFunction) {
            updateFunction((prevItems) => updateItem(prevItems))
        }
    }

    const handleTextAreaInput = () => {
        textAreaRef.current.style.height = '300px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }

    return (
        <section>
            <DataShell title="商品詳情">
                <form action="" className="space-y-6">
                    <div className="flex flex-col-reverse lg:flex-row lg:space-x-6">
                        <div className="grow">
                            <InputComponent
                                label="名稱"
                                type="text"
                                value={''}
                                onChange={() => {}}
                                placeholder="請輸入驗證碼"
                            />
                        </div>
                        <div className="mx-auto h-[118px] w-[214px] bg-gray-3"></div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="flex grow">
                            <CustomizeDatePickerInput
                                label="訂單成立時間 - 迄"
                                slotProps={{
                                    inputAdornment: {
                                        position: 'start',
                                    },
                                }}
                            />
                        </div>
                        <div className="flex grow">
                            <CustomizeDatePickerInput
                                label="訂單成立時間 - 迄"
                                slotProps={{
                                    inputAdornment: {
                                        position: 'start',
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="flex grow">
                            <CustomizeDatePickerInput
                                label="訂單成立時間 - 迄"
                                slotProps={{
                                    inputAdornment: {
                                        position: 'start',
                                    },
                                }}
                            />
                        </div>
                        <div className="flex grow">
                            <CustomizeDatePickerInput
                                label="訂單成立時間 - 迄"
                                slotProps={{
                                    inputAdornment: {
                                        position: 'start',
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="grow">
                            <InputComponent
                                label="名稱"
                                type="text"
                                value={''}
                                onChange={() => {}}
                                placeholder="請輸入驗證碼"
                            />
                        </div>
                        <div className="grow">
                            <InputComponent
                                label="名稱"
                                type="text"
                                value={''}
                                onChange={() => {}}
                                placeholder="請輸入驗證碼"
                            />
                        </div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="grow">
                            <InputComponent
                                label="名稱"
                                type="text"
                                value={''}
                                onChange={() => {}}
                                placeholder="請輸入驗證碼"
                            />
                        </div>
                        <div className="grow">
                            <InputComponent
                                label="名稱"
                                type="text"
                                value={''}
                                onChange={() => {}}
                                placeholder="請輸入驗證碼"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                臨時通知
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() =>
                                    handleCreateDragItem('notification')
                                }>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'notification')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {notifications.map(
                                                (item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragItem
                                                                    value={
                                                                        item.content
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleChange(
                                                                            'notification',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDelete={() =>
                                                                        handleDeleteDragItem(
                                                                            'notification',
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ),
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                活動亮點
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() =>
                                    handleCreateDragItem('highlight')
                                }>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'highlight')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {highlights.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <DragItem
                                                                value={
                                                                    item.content
                                                                }
                                                                onChange={(e) =>
                                                                    handleChange(
                                                                        'highlight',
                                                                        e.target
                                                                            .value,
                                                                        item.id,
                                                                    )
                                                                }
                                                                onDelete={() =>
                                                                    handleDeleteDragItem(
                                                                        'highlight',
                                                                        item.id,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-2 md:gap-4">
                        <label className="align-start text-small2 text-white md:text-small1">
                            活動介紹
                        </label>
                        <div className=" rounded-lg border border-gray-3 bg-gray-1 px-3 py-2 md:px-4 md:py-3">
                            <textarea
                                ref={textAreaRef}
                                name={''}
                                id={'registerKey'}
                                className="h-[300px] w-full resize-none bg-transparent pr-3 text-small2 text-white outline-none scrollbar-hidden placeholder:text-gray-4 md:pr-4 md:text-body"
                                placeholder={''}
                                defaultValue={''}
                                onChange={handleTextAreaInput}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                注意事項
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() => handleCreateDragItem('caution')}>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'caution')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {notifications.map(
                                                (item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragItem
                                                                    value={
                                                                        item.content
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleChange(
                                                                            'caution',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDelete={() =>
                                                                        handleDeleteDragItem(
                                                                            'caution',
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ),
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                確認詳情
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() =>
                                    handleCreateDragItem('confirmation')
                                }>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'confirmation')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {notifications.map(
                                                (item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragItem
                                                                    value={
                                                                        item.content
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleChange(
                                                                            'confirmation',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDelete={() =>
                                                                        handleDeleteDragItem(
                                                                            'confirmation',
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ),
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                取消政策
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() =>
                                    handleCreateDragItem('cancelPolicy')
                                }>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'cancelPolicy')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {notifications.map(
                                                (item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragItem
                                                                    value={
                                                                        item.content
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleChange(
                                                                            'cancelPolicy',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDelete={() =>
                                                                        handleDeleteDragItem(
                                                                            'cancelPolicy',
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ),
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <h5 className="text-small2 text-white md:text-small1">
                                憑證類型
                            </h5>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className="p-2 px-6"
                                onClick={() =>
                                    handleCreateDragItem('certificate')
                                }>
                                <p className="text-sm">新增</p>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <DragDropContext
                                onDragEnd={(result: DropResult) =>
                                    onDragEnd(result, 'certificate')
                                }>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="space-y-4">
                                            {notifications.map(
                                                (item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <DragItem
                                                                    value={
                                                                        item.content
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleChange(
                                                                            'certificate',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDelete={() =>
                                                                        handleDeleteDragItem(
                                                                            'certificate',
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ),
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                </form>
            </DataShell>
        </section>
    )
}

export default Page
