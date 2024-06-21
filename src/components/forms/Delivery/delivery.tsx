'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { InputComponent } from '@components/common'
import { SelectInput } from '@components/common'
import { Button } from '@/components/common'
import fetchClient from '@/lib/fetchClient'

const Delivery = () => {
    const [username, setUsername] = useState('')
    const [deliveryEmail, setDeliveryEmail] = useState('')
    const [payMethod, setPayMethod] = useState('線上付款')
    const [phone, setPhone] = useState('')
    const [delivery, setDelivery] = useState('線上取票')
    const [address, setAddress] = useState('')

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }
    const handleDeliveryEmailChange = (value: string) => {
        setDeliveryEmail(value)
    }
    const handlePayMethodChange = (value: string) => {
        console.log(payMethod)
        setPayMethod(value)
    }
    const handlePhoneChange = (value: string) => {
        setPhone(value)
    }
    const handleDeliveryChange = (value: string) => {
        setDelivery(value)
    }
    const handleAddressChange = (value: string) => {
        setAddress(value)
    }

    const option = ['線上付款', '貨到付款']
    //
    const orderData = {
        items: [
            {
                productId: '66658079d23d0fe8146bcc2a',
                plan: {
                    name: '三人同行',
                    discount: 0.5,
                    headCount: 10,
                },
                amount: 1,
            },
        ],
        price: 5500,
        paymentMethod: 'linePay',
        deliveryInfo: {
            name: username,
            phone: phone,
            address: address,
            email: deliveryEmail,
        },
    }
    const handleOrderSubmit = async () => {
        try {
            const response = await fetchClient({
                method: 'POST',
                url: 'api/v1/order',
                body: JSON.stringify(orderData),
            })

            if (response.status == 6000) {
                const responseData = await response
                const { status, message, data } = responseData
                console.log(responseData, 'responseresponse')
                if (status === '6000') {
                    // Order was successful
                    alert('Order successful! Redirecting to payment page...')
                    window.location.href = data.linePay.paymentUrl // Redirect to Line Pay payment URL
                } else {
                    // Order failed with specific error
                    alert(`Order failed: ${message}`)
                    // Redirect to error page or handle as needed
                }
            } else {
                // Handle HTTP error responses
                alert('Failed to submit order')
                // Redirect to error page or handle as needed
            }
        } catch (error) {
            console.error('Error submitting order:', error)
            alert('Failed to submit order')
            // Redirect to error page or handle as needed
        }
    }
    return (
        <>
            <div className="text-center">
                <h2 className="text-header5 font-bold tracking-wide text-white md:text-header4">
                    填寫配送資料
                </h2>
            </div>

            <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 justify-between gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <InputComponent
                            name={'username'}
                            label={'購買人姓名'}
                            type={'text'}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputComponent
                            name={'deliveryArea'}
                            label={'購買人信箱'}
                            type={'text'}
                            value={deliveryEmail}
                            onChange={handleDeliveryEmailChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label className="mb-2 block text-small2 leading-150 text-white md:text-small1">
                            付款方式
                        </label>
                        <div className="mt-auto md:mt-2.5">
                            <SelectInput
                                placeholder="線上付款"
                                options={option}
                                label={'付款方式'}
                                onSelectChange={handlePayMethodChange}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <InputComponent
                            name={'phone'}
                            label={'收件人手機'}
                            type={'text'}
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputComponent
                            disabled={true}
                            name={'delivery'}
                            label={'運送方式'}
                            type={'text'}
                            value={delivery}
                            onChange={handleDeliveryChange}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <InputComponent
                            name={'address'}
                            label={'宅配地址'}
                            type={'text'}
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </div>
                    <div className="col-span-full">
                        <label className="mb-2 block text-small2 leading-150 text-white md:text-small1">
                            備註說明
                        </label>
                        <div className="mt-auto md:mt-2.5">
                            <textarea
                                className="border-1 ring-black-300/10 block h-full w-full w-full resize-y rounded-md border-gray-3 bg-gray-1 px-2.5 py-2 text-small2 leading-150 text-white shadow-sm ring-1 placeholder:text-gray-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:px-4 md:py-2.5 md:text-body"
                                name="postContent"
                            />
                        </div>
                    </div>
                </div>{' '}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        name="checkout"
                        onClick={handleOrderSubmit}
                        value="確認送出訂單"
                        type={'submit'}
                        title="checkout"
                        className="py-3 text-btn2 font-semibold text-white md:text-btn1"
                    />
                </div>
            </div>
        </>
    )
}
export default Delivery
