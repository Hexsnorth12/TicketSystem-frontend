import fetchClient from '@/lib/fetchClient'
import { getUserSession } from '@/lib/auth.actions'
import { TicketDetail } from '@/types'

export type Product = {
    limit: number
    page: string
    isPublic: boolean
    _id: string
    title: string
    type: string
    genre: string
    theater: string
    brief: string
    vendor: string
    price: number
    amount: number
    soldAmount: number
    isLaunched: boolean
    recommendWeight: number
    sellEndAt: string
    sellStartAt: string
    endAt: string
    startAt: string
    tags: { tagId: string }[]
    photoPath: string
    isFavorite: boolean
}

export type Group = {
    _id: string
    title: string
    movieTitle: string
    amount: number
    placeholderImg: string
    theater: string
    hasTicket: boolean
    time: string
    endAt: string
    startAt: string
    vacancy: number
    status: string
    content: string
    participantCount: number
}

export type Ticket = {
    photoPath: string
    _id: string
    productId: string
    userId: string
    orderId: string
    expiredAt: string
    writeOffAt: string
    writeOffStaffId: string
    giverId: string
    hasTicket: boolean
    status: 'unverified' | 'expired' | 'refunded'
    isPublished: boolean
    product: {
        _id: string
        title: string
        theater: string
        price: number
        startAt: string
        recommendWeight: number
        isPublic: boolean
        photoPath: string
        type: string
    }
    shareCode: string
    count: number
}

export const fetchGeneralProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession()
        const token = session?.user?.token
        const params = new URLSearchParams({
            limit: '50',
            page: '1',
            isPublic: 'true',
            sortField: 'sellStartAt',
            sortOrder: 'desc',
        })

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        });
        console.log("總覽API 回應的數據:", data);

        if (data && data.products) {
            return data.products.map((product: Product) => ({
                ...product,
                photoPath: product.photoPath.startsWith('')
                    ? product.photoPath
                    : `${product.photoPath}`,
            }));
        } else {
            throw new Error('未找到商品');
        }
    } catch (err) {
        throw new Error('獲取商品失敗');
    }
};

export const fetchResultProducts = async (theater: string): Promise<Product[]> => {
    try {
        const { session } = await getUserSession();
        const token = session?.user?.token;
        const params = new URLSearchParams({
            limit: '50',
            page: '1',
            isPublic: 'true',
            sortField: 'sellStartAt',
            sortOrder: 'desc',
            theaters: theater,
        });

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        });
        console.log("搜尋結果API 回應的數據:", data);

        if (data && data.products) {
            return data.products.map((product: Product) => ({
                ...product,
                photoPath: product.photoPath.startsWith('')
                    ? product.photoPath
                    : `${product.photoPath}`,
            }))
        } else {
            throw new Error('未找到商品')
        }
    } catch (err) {
        throw new Error('獲取商品失敗')
    }
}

export const fetchPopProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession()
        const token = session?.user?.token
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'soldAmount',
            sortOrder: 'asc',
        })

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        })

        if (data && data.products) {
            return data.products.map((product: Product) => ({
                ...product,
                photoPath: product.photoPath.startsWith('')
                    ? product.photoPath
                    : `${product.photoPath}`,
            }))
        } else {
            throw new Error('未找到商品')
        }
    } catch (err) {
        throw new Error('獲取商品失敗')
    }
}

export const fetchRecProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession()
        const token = session?.user?.token
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'recommendWeight',
            sortOrder: 'asc',
        })

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        })

        if (data && data.products) {
            return data.products.map((product: Product) => ({
                ...product,
                photoPath: product.photoPath.startsWith('')
                    ? product.photoPath
                    : `${product.photoPath}`,
            }))
        } else {
            throw new Error('未找到商品')
        }
    } catch (err) {
        throw new Error('獲取商品失敗')
    }
}

export const fetchGroupProducts = async (): Promise<Group[]> => {
    try {
        const { session } = await getUserSession()
        const token = session?.user?.token
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'createdAt',
            sortOrder: 'desc',
        })

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/group?${params.toString()}`,
            token,
            tags: ['group'],
        })

        if (data && data.groups) {
            return data.groups.map((group: Group) => ({
                ...group,
                placeholderImg: group.placeholderImg.startsWith('')
                    ? group.placeholderImg
                    : `${group.placeholderImg}`,
            }))
        } else {
            throw new Error('未找到商品')
        }
    } catch (err) {
        throw new Error('獲取商品失敗')
    }
}

export const fetchTicketProducts = async (): Promise<Ticket[]> => {
    try {
        const { session } = await getUserSession()
        const token = session?.user?.token
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            sortField: 'createdAt',
            sortOrder: 'desc',
        })

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/ticket-shared?${params.toString()}`,
            token,
            tags: ['ticekt'],
        })

        if (data && data.tickets) {
            return data.tickets.map((ticket: Ticket) => ({
                ...ticket,
                photoPath: ticket.product.photoPath.startsWith('')
                    ? ticket.product.photoPath
                    : `${ticket.product.photoPath}`,
            }))
        } else {
            throw new Error('未找到商品')
        }
    } catch (err) {
        throw new Error('獲取商品失敗')
    }
}

export const favorites = [
    {
        name: '電影名稱1',
        id: '3',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard1.jpg',
        type: '科幻',
        city: '台北市',
    },
    {
        name: '電影名稱2',
        id: '1',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard2.jpg',
        type: '科幻',
        city: '台北市',
    },
    {
        name: '電影名稱3',
        id: '2',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard3.jpg',
        type: '科幻',
        city: '台北市',
    },
    {
        name: '電影名稱4',
        id: '4',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard4.jpg',
        type: '科幻',
        city: '台北市',
    },
    {
        name: '電影名稱5',
        id: '13',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard5.jpg',
        type: '科幻',
        city: '台北市',
    },
    {
        name: '電影名稱6',
        id: '22',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard6.jpg',
        type: '科幻',
        city: '台北市',
    },
]

export const dummyTicketList: Ticket[] = [
    {
        _id: 'asdfasdfasd',
        photoPath: '',
        productId: 'cdscsdcsdc',
        userId: '123235564364567',
        orderId: 'iiddidididi',
        status: 'unverified',
        isPublished: false,
        expiredAt: '2024-06-13T12:50:23.685Z',
        writeOffAt: '2024-06-13T12:50:23.685Z',
        writeOffStaffId: 'rrr',
        giverId: 'iiddidididi',
        hasTicket: true,
        product: {
            _id: '66570169343ccb01f586dfed',
            title: '這是個很棒的電影名稱',
            theater: '信義威秀',
            price: 1100,
            startAt: '2024-08-13T16:00:00.000Z',
            recommendWeight: 1,
            isPublic: false,
            photoPath: '',
            type: '',
        },
        shareCode: '112315641231',
        count: 2,
    },
]

export const dummyTicketDetail: TicketDetail = {
    _id: '23h4iuh2iu5hih1ui4hi',
    userId: 'userIdddisieowofen',
    orderId: '$orderIdwgefiowehpfuuew',
    productId: 'productIdoiwjnfpewfuioed',
    status: 'unverified',
    isPublished: false,
    title: 'testproduct',
    photoPath: 'testproduct',
    theater: 'testproduct',
    price: 2000,
    expiredAt: '2024-06-15T14:50:23.685Z',
    startAt: '2024-06-15T16:50:23.686Z',
    purchaseAt: '2024-06-15T12:50:23.686Z',
    purchaseAmount: 11,
}
