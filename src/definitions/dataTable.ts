import { HeadCell } from '@/types/table'

export const OrderHeadCell: HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '訂單編號',
    },
    {
        id: 'thirdPartyPaymentId',
        numeric: false,
        disablePadding: true,
        label: '第三方金流訂單編號',
    },
    {
        id: 'account',
        numeric: false,
        disablePadding: true,
        label: '購買帳號',
    },
    {
        id: 'paymentMethod',
        numeric: false,
        disablePadding: true,
        label: '付款方式',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: '訂單金額',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: '訂單成立時間',
    },
    {
        id: 'paidAt',
        numeric: false,
        disablePadding: true,
        label: '付款時間',
    },
]

export const CheckHeadCell: HeadCell[] = [
    {
        id: 'orderId',
        numeric: false,
        disablePadding: true,
        label: '訂單編號',
    },
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: '票券編號',
    },
    {
        id: 'productName',
        numeric: false,
        disablePadding: true,
        label: '商品',
    },
    {
        id: 'user',
        numeric: false,
        disablePadding: true,
        label: '擁有者資訊',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: '狀態',
    },
    {
        id: 'writeOffDate',
        numeric: false,
        disablePadding: true,
        label: '核銷日期',
    },
    {
        id: 'staffId',
        numeric: false,
        disablePadding: true,
        label: '核銷人員',
    },
]

export const dummyOrder = [
    {
        orderId: '123456',
        thirdPartyPaymentId: '654321',
        account: 'test123',
        paymentMethod: 'credit card',
        price: 1000,
        status: 'paid',
        createdAt: '2023.08.09 11:32',
        paidAt: '2023.08.09 11:32',
    },
]

export const DATA_OPTIONS = {
    OrderStatus: ['paid', 'pending', 'refunded', 'expired', 'failed'],
}
