// services/linePay.ts

const LINE_PAY_API_BASE_URL = 'https://api-pay.line.me'

// Replace with your own Channel ID and Channel Secret
const LINE_PAY_CHANNEL_ID = process.env.LINE_PAY_CHANNEL_ID
const LINE_PAY_CHANNEL_SECRET = process.env.LINE_PAY_CHANNEL_SECRET

export const initiatePayment = async (
    orderId: string,
    amount: number,
    currency: string,
    confirmUrl: string,
    cancelUrl: string,
) => {
    try {
        const response = await fetch(`${LINE_PAY_API_BASE_URL}/v1/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-LINE-ChannelId': LINE_PAY_CHANNEL_ID!,
                'X-LINE-ChannelSecret': LINE_PAY_CHANNEL_SECRET!,
            },
            body: JSON.stringify({
                amount,
                currency,
                orderId,
                redirectUrls: {
                    confirmUrl,
                    cancelUrl,
                },
            }),
        })

        if (!response.ok) {
            throw new Error('Failed to initiate payment')
        }

        return await response.json()
    } catch (error) {
        console.error('Error initiating Line Pay payment:', error)
        throw error
    }
}

export const confirmPayment = async (
    transactionId: string,
    amount: number,
    currency: string,
) => {
    try {
        const response = await fetch(
            `${LINE_PAY_API_BASE_URL}/v2/payments/${transactionId}/confirm`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-LINE-ChannelId': LINE_PAY_CHANNEL_ID!,
                    'X-LINE-ChannelSecret': LINE_PAY_CHANNEL_SECRET!,
                },
                body: JSON.stringify({
                    amount,
                    currency,
                }),
            },
        )

        if (!response.ok) {
            throw new Error('Failed to confirm payment')
        }

        return await response.json()
    } catch (error) {
        console.error('Error confirming Line Pay payment:', error)
        throw error
    }
}
