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
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { parseISO, format, startOfMonth, endOfMonth } from 'date-fns'
import { useForm, FieldPath, FieldValues, Controller } from 'react-hook-form'

import {
    DragItem,
    DataShell,
    Button,
    InputComponent,
    SelectInput,
    InputRegister,
} from '@/components/common'
import { InputItem } from '@/types/table'
import add from '@icon/add_primary.svg'
import { Tag } from '@/components/admin'
import uploadImage from '@/lib/uploadImage'
import { useCreateProductMutation } from '@/services/modules/product'
import { Plan } from '@/types/product'
import { JOIN_OPTIONS } from '@/definitions/joinForm'
import { DragInput } from '@/components/admin'

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

const initValue = [
    {
        id: 'item1',
        content: '',
    },
]

export interface FormValues {
    title: string
    vendor: string
    price: string
    theater: string
    recommendWeight: string
    sellEndAt: string
    sellStartAt: string
    endAt: string
    startAt: string
}

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
    const [imageUrl, setImageUrl] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])

    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const tagRef = useRef<HTMLInputElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)
    const briefRef = useRef<HTMLTextAreaElement>(null)
    const { data: session } = useSession()
    const [createProduct, { isLoading }] = useCreateProductMutation()
    const {
        register,
        formState: { errors },
        setError,
        control,
        handleSubmit,
    } = useForm<FieldValues>()

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
                    id: uuidv4(),
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

    const handleAddTag = () => {
        const value = tagRef.current?.value
        if (value && !tags.includes(value)) {
            setTags([...tags, value])
            tagRef.current!.value = ''
        }
    }

    const handleDeleteTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index)
        setTags(newTags)
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => setImageUrl(e.target?.result as string)
        reader.readAsDataURL(file)
        // const formData = new FormData()
        // formData.append('avatar', file)

        // const token = session?.accessToken || ''

        // const imageURL = await uploadImage(formData, 'user', token)
        // const imgUrl = imageURL?.isSuccess ? imageURL?.url : ''
    }

    const handleUpload = () => {
        if (fileRef.current) fileRef.current.click()
    }

    const handleCreateProduct = async (data: FieldValues) => {
        const file = fileRef.current?.files[0]
        if (!file) return
        const formData = new FormData()
        formData.append('avatar', file)
        const token = session?.accessToken || ''

        const imageURL = await uploadImage(formData, 'user', token)
        const photoPath = imageURL?.isSuccess ? imageURL?.url : ''
        createProduct({
            payload: {
                products: [
                    {
                        soldAmount: 0,
                        title: data.title,
                        brief: '',
                        type: '電影',
                        genre: '科幻',
                        vendor: data.vendor,
                        theater: data.theater,
                        price: Number(data.price),
                        amount: 10,
                        isLaunched: false,
                        isPublic: false,
                        recommendWeight: Number(data.recommendWeight),
                        sellEndAt: format(
                            data.sellEndAt,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                        ),
                        sellStartAt: format(
                            data.sellStartAt,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                        ),
                        endAt: format(
                            data.endAt,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                        ),
                        startAt: format(
                            data.startAt,
                            "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                        ),
                        photoPath,
                        introduction: textAreaRef.current?.value || '',
                        notifications: notifications.map(
                            (item) => item.content,
                        ),
                        highlights: highlights.map((item) => item.content),
                        cautions: cautions.map((item) => item.content),
                        confirmations: confirmations.map(
                            (item) => item.content,
                        ),
                        cancelPolicies: cancelPolicies.map(
                            (item) => item.content,
                        ),
                        certificates: certificates.map((item) => item.content),
                        tagNames: tags,
                        plans: [
                            {
                                name: '一人獨享',
                                discount: 1,
                                headCount: 1,
                            },
                            {
                                name: '兩人同行',
                                discount: 0.8,
                                headCount: 2,
                            },
                            {
                                name: '三人同行',
                                discount: 0.5,
                                headCount: 3,
                            },
                        ],
                    },
                ],
            },
            token,
        })
    }

    // const handleCreateProduct = async (data: FieldValues) => {
    //     console.log(
    //         'form',
    //         format(data.sellStartAt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
    //     )
    // }

    return (
        <section>
            <DataShell title="新增商品">
                <form
                    action=""
                    className="space-y-6"
                    onSubmit={handleSubmit(handleCreateProduct)}>
                    <div className="flex flex-col-reverse lg:flex-row lg:space-x-6">
                        <div className="grow">
                            <InputRegister
                                label="商品名稱"
                                type="text"
                                placeholder={'請輸入商品名稱'}
                                registerKey="title"
                                register={register}
                                defaultValue={''}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div
                            className="relative mx-auto h-[118px] w-[214px] rounded-lg bg-gray-3"
                            onClick={handleUpload}>
                            <input
                                ref={fileRef}
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Image
                                src={imageUrl ?? ''}
                                alt="avatar"
                                className={clsx(
                                    'h-full w-full rounded-lg object-contain',
                                    {
                                        hidden: imageUrl.length === 0,
                                    },
                                )}
                                width={80}
                                height={80}
                            />
                            <Image
                                src={add}
                                alt="uploadImage"
                                className={clsx(
                                    'absolute left-[50%] top-[50%] z-30 -translate-x-1/2 -translate-y-1/2',
                                    {
                                        hidden: imageUrl.length !== 0,
                                    },
                                )}
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="flex grow">
                            <Controller
                                name="sellStartAt"
                                control={control}
                                defaultValue={startOfMonth(new Date())}
                                render={({ field }) => (
                                    <CustomizeDatePickerInput
                                        {...field}
                                        label="販售開始時間"
                                        slotProps={{
                                            inputAdornment: {
                                                position: 'start',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex grow">
                            <Controller
                                name="sellEndAt"
                                control={control}
                                defaultValue={endOfMonth(new Date())}
                                render={({ field }) => (
                                    <CustomizeDatePickerInput
                                        {...field}
                                        label="販售結束時間"
                                        slotProps={{
                                            inputAdornment: {
                                                position: 'start',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="flex grow">
                            <Controller
                                name="startAt"
                                control={control}
                                defaultValue={startOfMonth(new Date())}
                                render={({ field }) => (
                                    <CustomizeDatePickerInput
                                        {...field}
                                        label="活動開始時間"
                                        slotProps={{
                                            inputAdornment: {
                                                position: 'start',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex grow">
                            <Controller
                                name="endAt"
                                control={control}
                                defaultValue={endOfMonth(new Date())}
                                render={({ field }) => (
                                    <CustomizeDatePickerInput
                                        {...field}
                                        label="活動結束時間"
                                        slotProps={{
                                            inputAdornment: {
                                                position: 'start',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-2">
                        <Controller
                            name="vendor"
                            control={control}
                            render={({ field }) => (
                                <div className="grow space-y-3">
                                    <label
                                        htmlFor=""
                                        className="text-small2 text-gray-5 md:text-small1">
                                        廠商地區
                                    </label>
                                    <SelectInput
                                        placeholder="請選擇商品類型"
                                        label="商品類型"
                                        options={['特映會']}
                                        onSelectChange={field.onChange}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name="vendor"
                            control={control}
                            render={({ field }) => (
                                <div className="grow space-y-3">
                                    <label
                                        htmlFor=""
                                        className="text-small2 text-gray-5 md:text-small1">
                                        廠商
                                    </label>
                                    <SelectInput
                                        placeholder="請選擇商品類型"
                                        label="商品類型"
                                        options={['特映會']}
                                        onSelectChange={field.onChange}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-between gap-3 lg:flex-row lg:gap-2">
                        <Controller
                            name="vendor"
                            control={control}
                            render={({ field }) => (
                                <div className="grow space-y-3">
                                    <label
                                        htmlFor=""
                                        className="text-small2 text-gray-5 md:text-small1">
                                        類型
                                    </label>
                                    <SelectInput
                                        placeholder="請選擇商品類型"
                                        label="商品類型"
                                        options={['特映會']}
                                        onSelectChange={field.onChange}
                                    />
                                </div>
                            )}
                        />

                        <div className="grow">
                            <InputRegister
                                label="價格"
                                type="text"
                                placeholder={'請輸入價格'}
                                registerKey="price"
                                register={register}
                                defaultValue={''}
                                errors={errors}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="5 flex flex-col justify-between gap-3 lg:flex-row lg:gap-2">
                        <div className="grow">
                            <InputRegister
                                label="地點"
                                type="text"
                                placeholder={'請輸入地點'}
                                registerKey="theater"
                                register={register}
                                defaultValue={''}
                                errors={errors}
                                required={true}
                            />
                        </div>
                        <div className="grow">
                            <InputRegister
                                label="權重"
                                type="text"
                                placeholder={'請輸入權重'}
                                registerKey="recommendWeight"
                                register={register}
                                defaultValue={''}
                                errors={errors}
                                required={true}
                            />
                        </div>
                    </div>

                    <DragInput
                        label={'臨時通知'}
                        type={'notification'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={notifications}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />
                    <DragInput
                        label={'活動亮點'}
                        type={'highlight'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={highlights}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />

                    {/* <div>
                        <div className="mb-4 flex items-center space-x-3">
                            <label className="text-small2 text-white md:text-small1">
                                臨時通知
                            </label>
                            <Button
                                type="button"
                                title="error-modal-button"
                                className=" hover:bg-gary-2 border-gray-3 bg-gray-2 p-2 px-4 hover:border-primary hover:text-white"
                                onClick={() =>
                                    handleCreateDragItem('highlight')
                                }>
                                <div className="flex items-center space-x-0.5">
                                    <p className="text-sm">新增</p>
                                    <Image
                                        src={add}
                                        alt="add"
                                        width={16}
                                        height={16}
                                    />
                                </div>
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
                    </div> */}
                    <div className="flex w-full flex-col gap-2 md:gap-4">
                        <label className="align-start text-small2 text-white md:text-small1">
                            簡介(限制100字)
                        </label>
                        <div className=" rounded-lg border border-gray-3 bg-gray-1 px-3 py-2 md:px-4 md:py-3">
                            <textarea
                                ref={briefRef}
                                name={'brief'}
                                id={'registerKey'}
                                className="h-[300px] w-full resize-none bg-transparent pr-3 text-small2 text-white outline-none scrollbar-hidden placeholder:text-gray-4 md:pr-4 md:text-body"
                                placeholder={'請輸入100字內商品簡介'}
                                defaultValue={''}
                                maxLength={100}
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-2 md:gap-4">
                        <label className="align-start text-small2 text-white md:text-small1">
                            活動介紹
                        </label>
                        <div className=" rounded-lg border border-gray-3 bg-gray-1 px-3 py-2 md:px-4 md:py-3">
                            <textarea
                                ref={textAreaRef}
                                name={'introduction'}
                                id={'registerKey'}
                                className="h-[300px] w-full resize-none bg-transparent pr-3 text-small2 text-white outline-none scrollbar-hidden placeholder:text-gray-4 md:pr-4 md:text-body"
                                placeholder={''}
                                defaultValue={''}
                                onChange={handleTextAreaInput}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-small2 text-white md:text-small1">
                            標籤
                        </label>
                        <div className="mt-4 rounded-lg border border-gray-4 px-4 py-3">
                            <div className="mb-3 flex min-h-10 flex-wrap justify-start gap-2">
                                {tags.map((tag, index) => (
                                    <Tag
                                        key={uuidv4()}
                                        value={tag}
                                        onDelete={() => handleDeleteTag(index)}
                                    />
                                ))}
                            </div>
                            <div className="flex">
                                <input
                                    ref={tagRef}
                                    type="text"
                                    className="grow bg-transparent text-small2 text-white outline-none placeholder:text-gray-4"
                                    placeholder="請輸入標籤名稱"
                                />
                                <p
                                    className="cursor-pointer rounded-lg border border-gray-4 px-3 py-1 text-small2 text-white hover:border-primary"
                                    onClick={handleAddTag}>
                                    送出
                                </p>
                            </div>
                        </div>
                    </div>

                    <DragInput
                        label={'注意事項'}
                        type={'caution'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={cautions}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />

                    <DragInput
                        label={'確認詳情'}
                        type={'confirmation'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={confirmations}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />

                    <DragInput
                        label={'取消政策'}
                        type={'cancelPolicy'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={cancelPolicies}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />

                    <DragInput
                        label={'憑證類型'}
                        type={'certificate'}
                        onAdd={handleCreateDragItem}
                        onDragEnd={onDragEnd}
                        dragItems={certificates}
                        onChange={handleChange}
                        onDelete={handleDeleteDragItem}
                    />

                    <div className="flex items-center justify-center">
                        <Button
                            type="submit"
                            title="submit"
                            name="form"
                            value="新增商品"
                        />
                    </div>
                </form>
            </DataShell>
        </section>
    )
}

export default Page
