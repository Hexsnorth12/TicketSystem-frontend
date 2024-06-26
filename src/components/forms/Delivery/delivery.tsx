'use client' // This is a client component 👈🏽
import React, { useState } from 'react'
import { InputComponent } from '@components/common'
import { SelectInput } from '@components/common'
import { Button } from '@/components/common'
import fetchClient from '@/lib/fetchClient'
import { useCartStore } from '@/stores/useCartStore'
import { DataSource } from '@/types/cart'
import { createNewebPayOrder } from '@/utils/paymentUtils'
import { useAlert } from '@/components/useAlert/useAlert'
const Delivery = () => {
    const [username, setUsername] = useState('')
    const [deliveryEmail, setDeliveryEmail] = useState('')
    const [payMethod, setPayMethod] = useState<string>('')
    const [phone, setPhone] = useState('')
    const [delivery, setDelivery] = useState('線上取票')
    const [address, setAddress] = useState('')
    const showAlert = useAlert()
    const dataSource: DataSource[] = []
    const cart = useCartStore((state) => state.cart)
    const LogOut = useCartStore((state) => state.LogOut)
    cart.forEach((item) => {
        const dataSourceItem: DataSource = {
            key: item._id,
            name: {
                image: item.photoPath,
                title: item.title,
                subtitle: item.selectedPlan.name,
            },
            selectedPlan: item.selectedPlan,
            number: item.quantity,
            price:
                (item.price as number) *
                item.selectedPlan.discount *
                item.selectedPlan.headCount,
        }

        dataSource.push(dataSourceItem) // 添加到 dataSource 数组中
    })
    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }
    const isValidEmail = (email: string) => {
        // 正則表達式來驗證電子郵件格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    const isValidPhoneNumber = (phoneNumber: string) => {
        // 正则表达式来验证手机号格式，这里简单示范，具体可根据需要调整
        const phoneRegex = /^\d{10}$/ // 假设手机号为10位数字

        return phoneRegex.test(phoneNumber)
    }

    const handleDeliveryEmailChange = (value: string) => {
        setDeliveryEmail(value)
    }
    const handlePayMethodChange = (selectedOption: string) => {
        const value = paymentMethodMap[selectedOption]
        console.log(value) // Log the selected payment method value
        setPayMethod(value) // Update state with selected payment method value
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

    const option = ['LINEPAY', '藍新金流']
    //

    const paymentMethodMap: { [key: string]: string } = {
        LINEPAY: 'linePay',
        藍新金流: 'newebPay',
    }
    const total = cart.reduce((acc, product) => {
        const selectedPlan = product.selectedPlan // 确保这里的 selectedPlan 是正确的
        const price = product.price ?? 0
        if (selectedPlan && selectedPlan.discount && selectedPlan.headCount) {
            return (
                acc +
                price *
                    selectedPlan.discount *
                    selectedPlan.headCount *
                    product.quantity
            )
        }
        // 如果没有折扣信息，按原价计算
        return acc + price * product.quantity
    }, 0)
    const orderData = {
        items: dataSource.map((item) => ({
            productId: item.key,
            plan: item.selectedPlan,
            amount: item.number,
        })),
        price: total, // 使用第一个 dataSourceItem 的 price
        paymentMethod: payMethod,
        deliveryInfo: {
            name: username,
            phone: phone,
            address: address,
            email: deliveryEmail,
        },
    }

    const handleOrderSubmit = async () => {
        if (
            !orderData.deliveryInfo.name ||
            !orderData.deliveryInfo.phone ||
            !orderData.deliveryInfo.email ||
            !orderData.deliveryInfo.address
        ) {
            showAlert('請填寫姓名、電話、電子郵件和地址', 'warning')
            return
        }

        if (!isValidPhoneNumber(orderData.deliveryInfo.phone)) {
            showAlert('請填寫有效的電話號碼', 'warning')
            return
        }

        if (!isValidEmail(orderData.deliveryInfo.email)) {
            showAlert('請填寫有效的電子郵件地址', 'warning')
            return
        }
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
                    if (orderData.paymentMethod === 'linePay' && data.linePay) {
                        // Order was successful with Line Pay
                        showAlert('訂單成功', 'success')
                        LogOut()
                        window.location.href = data.linePay.paymentUrl // Redirect to Line Pay payment URL
                    } else if (
                        orderData.paymentMethod === 'newebPay' &&
                        data.newebPay
                    ) {
                        showAlert('訂單成功', 'success')
                        LogOut()
                        // Generate and submit the NewebPay form
                        const newebPayFormHtml = createNewebPayOrder(
                            data.newebPay.paymentGateway, // URL 通常不变
                            data.newebPay.MerchantID, // 首字母大写
                            data.newebPay.TradeInfo, // 首字母大写
                            data.newebPay.TradeSha, // 首字母大写
                            data.newebPay.Version, // 首字母大写
                        )
                        document.write(newebPayFormHtml)
                    } else {
                        // Invalid payment method or missing data
                        showAlert('訂單失敗', 'error')
                    }
                } else {
                    // Order failed with specific error

                    showAlert(`'訂單失敗: ${message}`, 'error')
                    // Redirect to error page or handle as needed
                }
            } else {
                // Handle HTTP error responses
                showAlert('訂單失敗', 'error')
                // Redirect to error page or handle as needed
            }
        } catch (error) {
            console.error('Error submitting order:', error)
            showAlert('訂單失敗', 'error')
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
