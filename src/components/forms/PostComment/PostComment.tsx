'use client'
import React, { useState, useRef } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TextArea, Button } from '@/components/common'
import RatingSelector, { RatingSelectorRef } from './RatingSelector'
import { usePostCommentMutation } from '@/services/modules/product'

interface PostCommentProps {
    productId: string
}

const PostComment: React.FC<PostCommentProps> = ({ productId }) => {
    const [rating, setRating] = useState(-1)
    const [postComment, { isLoading }] = usePostCommentMutation()
    const { register, handleSubmit, reset } = useForm<FieldValues>()
    const router = useRouter()
    const ratingRef = useRef<RatingSelectorRef>(null)
    const onSubmit = async (data: FieldValues) => {
        const session = await getSession()
        const accessToken = session?.user.token as string
        const payload = {
            productId,
            rating,
            content: data.comment,
            status: 'active',
        }
        try {
            await postComment({ payload, token: accessToken })
            if (!isLoading) {
                reset()
                resetSelectedIndex()
                router.refresh()
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleClickRating = (index: number) => {
        setRating(index)
    }

    const resetSelectedIndex = () => {
        ratingRef.current?.resetSelectedIndex()
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-4 border-b border-gray-5 pb-4 md:my-6 md:pb-6">
            <h4 className="text-header5 text-white md:px-3">評價商品</h4>
            <div className="py-3 md:px-3 md:py-4">
                <RatingSelector ref={ratingRef} onClick={handleClickRating} />
            </div>
            <TextArea
                label=""
                placeholder="評價此商品"
                registerKey={'comment'}
                register={register}
                required={false}
            />
            <div className="mt-3 flex justify-center md:mt-4">
                <Button
                    type={'submit'}
                    name="submit"
                    value="確認"
                    title={'confirm'}
                    onClick={() => {}}></Button>
            </div>
        </form>
    )
}

export default PostComment
