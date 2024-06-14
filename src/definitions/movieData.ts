import fetchClient from '@/lib/fetchClient';
import { getUserSession } from '@/lib/auth.actions';

export type Product = {
    limit: number;
    page: string;
    isPublic: boolean;
    _id: string;
    title: string;
    type: string;
    genre: string;
    theater: string;
    brief: string;
    vendor: string;
    price: number;
    amount: number;
    soldAmount: number;
    isLaunched: boolean;
    recommendWeight: number;
    sellEndAt: string;
    sellStartAt: string;
    endAt: string;
    startAt: string;
    tags: { tagId: string }[];
    photoPath: string;
};

export type Group = {
    _id: string
    title: string
    movieTitle: string
    amount: number
    placeholderImg: string
    location: string
    hasTicket: boolean
    time: string
    endAt: string
    startAt: string
    vacancy: number
    status: string
    content: string
    participantCount: number
};

export const fetchPopProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession();
        const token = session?.user?.token;
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'soldAmount',
            sortOrder: 'asc',
        });

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        });

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

export const fetchRecProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession();
        const token = session?.user?.token;
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'recommendWeight',
            sortOrder: 'asc',
        });

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/product?${params.toString()}`,
            token,
            tags: ['product'],
        });

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

export const fetchGroupProducts = async (): Promise<Product[]> => {
    try {
        const { session } = await getUserSession();
        const token = session?.user?.token;
        const params = new URLSearchParams({
            limit: '10',
            page: '1',
            isPublic: 'true',
            sortField: 'createdAt',
            sortOrder: 'desc',
        });

        const { data } = await fetchClient({
            method: 'GET',
            url: `api/v1/group?${params.toString()}`,
            token,
            tags: ['group'],
        });

        if (data && data.groups) {
            return data.groups.map((group: Group) => ({
                ...group,
                placeholderImg: group.placeholderImg.startsWith('/')
                    ? group.placeholderImg
                    : `/${group.placeholderImg}`,
            }));
        } else {
            throw new Error('未找到商品');
        }
    } catch (err) {
        throw new Error('獲取商品失敗');
    }
};

export const Sharecards = [
    {
        name: '電影名稱1',
        number: '3',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard1.jpg',
    },
    {
        name: '電影名稱2',
        number: '1',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard2.jpg',
    },
    {
        name: '電影名稱3',
        number: '2',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard3.jpg',
    },
    {
        name: '電影名稱4',
        number: '3',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard4.jpg',
    },
    {
        name: '電影名稱5',
        number: '1',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard5.jpg',
    },
    {
        name: '電影名稱6',
        number: '2',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard6.jpg',
    },
    {
        name: '電影名稱7',
        number: '3',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard7.jpg',
    },
    {
        name: '電影名稱8',
        number: '1',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard8.jpg',
    },
]

export const favorites = [
    {
        name: '電影名稱1',
        id: '3',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard1.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
    {
        name: '電影名稱2',
        id: '1',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard2.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
    {
        name: '電影名稱3',
        id: '2',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard3.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
    {
        name: '電影名稱4',
        id: '4',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard4.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
    {
        name: '電影名稱5',
        id: '13',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard5.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
    {
        name: '電影名稱6',
        id: '22',
        price: 800,
        date: '2024/04/03',
        image: '/assets/sharecard6.jpg',
        type: '科幻',
        city: '台北市',
        isAvailable: true,
    },
]

export const dummyTicketList: Ticket[] = [
    {
        _id: 'asdfasdfasd',
        productId: 'cdscsdcsdc',
        userId: '123235564364567',
        orderId: 'iiddidididi',
        status: 'unverified',
        isPublished: false,
        expiredAt: '2024-06-13T12:50:23.685Z',
        writeOffAt: '2024-06-13T12:50:23.685Z',
        writeOffStaffId: 'rrr',
        giverId: 'iiddidididi',
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
