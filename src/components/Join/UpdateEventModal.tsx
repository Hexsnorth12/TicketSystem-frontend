'use client'
import React from 'react'

import { Button, InputRegister, Modal, TextArea } from '../common'
import { CloseBtn } from '../Buttons'
import { FieldValues, useForm } from 'react-hook-form'

type Props = {
    onClose: () => void
    existedData: { title: string; content: string }
    updateEvent: (updateData: { title: string; content: string }) => void
}

const UpdateEventModal: React.FC<Props> = ({
    onClose,
    existedData,
    updateEvent,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()

    function submitHandler(data: FieldValues) {
        const updateData = {
            title: data.title,
            content: data.description,
        }
        updateEvent(updateData)
    }

    return (
        <Modal onClose={() => {}}>
            <div className="relative flex w-[500px] flex-col gap-5 px-6">
                <div
                    className="absolute right-[10px] top-[10px] cursor-pointer"
                    onClick={onClose}>
                    <CloseBtn />
                </div>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    action=""
                    className="w-full space-y-3 overflow-y-scroll md:max-h-[480px]  md:pr-10 md:scrollbar-hidden">
                    <InputRegister
                        label="標題"
                        type="text"
                        placeholder={'更新活動標題'}
                        registerKey="title"
                        register={register}
                        defaultValue={existedData?.title}
                        errors={errors}
                        required={true}
                    />
                    <TextArea
                        label="描述"
                        placeholder="更新活動內容"
                        registerKey={'description'}
                        register={register}
                        defaultValue={existedData?.content}
                        required={true}
                    />
                    <div className="flex justify-center">
                        <Button
                            type="submit"
                            name="submit"
                            value="修改"
                            title={'confirm'}
                            onClick={() => {}}></Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default UpdateEventModal
