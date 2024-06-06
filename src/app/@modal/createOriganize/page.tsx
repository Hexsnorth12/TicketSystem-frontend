'use client'
import React from 'react'
import Image from 'next/image'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import {
    ModalContent,
    SelectInput,
    SelectBox,
    Button,
    TextArea,
    InputRegister,
} from '@/components/common'
import add_primary from '@icon/add_primary.svg'
import { JOIN_OPTIONS } from '@/definitions/joinForm'

interface pageProps {}

// export interface FormValues extends FieldValues {
//     title: string
//     location: string
//     movie: string
//     time: string
//     person: string
//     isBought: string
//     description: string
// }

const Page: React.FC<pageProps> = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>()
    const onSubmit = (data: FieldValues) => console.log(data)
    return (
        <ModalContent tittle="">
            <div className="flex min-w-[279px] flex-col px-3 md:flex-row md:items-center md:justify-between md:gap-10 md:py-[34px]">
                <div className="mx-auto mb-3 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-lg border border-gray-3 bg-gray-1 md:h-[480px] md:w-[480px]">
                    <Image
                        src={add_primary}
                        alt="add_primary"
                        height={18}
                        width={18}
                        className="h-[18px] w-[18px]"
                    />
                    <p className="small2 text-white">新增照片</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="w-full space-y-3 overflow-y-scroll md:max-h-[480px]  md:pr-10 md:scrollbar">
                    <h4 className="mb-10 hidden border-b border-gray-3 py-4 text-header4 text-gray-4 md:block">
                        新增活動標題
                    </h4>
                    <InputRegister
                        label="標題"
                        type="text"
                        placeholder={'新增活動標題'}
                        registerKey="title"
                        register={register}
                        defaultValue={''}
                        errors={errors}
                        required={true}
                    />
                    <SelectBox title="位置">
                        <Controller
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.locationOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="電影名稱">
                        <Controller
                            name="movie"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.movieOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="時間">
                        <Controller
                            name="time"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.timeOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="人數">
                        <Controller
                            name="person"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.personOptions}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <SelectBox title="是否買票">
                        <Controller
                            name="isBought"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    placeholder="請選擇"
                                    label={''}
                                    options={JOIN_OPTIONS.isBought}
                                    onSelectChange={field.onChange}
                                />
                            )}
                        />
                    </SelectBox>
                    <TextArea
                        label="描述"
                        placeholder="新增活動內容"
                        registerKey={'description'}
                        register={register}
                        required={true}
                    />
                    <div className="flex justify-center">
                        <Button
                            type={'submit'}
                            name="submit"
                            value="確認"
                            title={'confirm'}
                            onClick={() => {}}>
                            <span>確認</span>
                        </Button>
                    </div>
                </form>
            </div>
        </ModalContent>
    )
}

export default Page
