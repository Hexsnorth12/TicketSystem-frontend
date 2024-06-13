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

export const Groupcards = [
    {
        name: '沙丘2',
        type: '劇院',
        city: '台北市',
        date: '2024.03.22 20:15',
        people: '2/4',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
        image: '/assets/groupcard1.png',
    },
    {
        name: '功夫熊貓4',
        type: '劇院',
        city: '台北市',
        date: '2024.03.22 20:15',
        people: '2/4',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
        image: '/assets/groupcard2.png',
    },
    {
        name: '可憐的東西',
        type: '劇院',
        city: '台北市',
        date: '2024.03.22 20:15',
        people: '2/4',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
        image: '/assets/groupcard3.png',
    },
    {
        name: '關於，半夜夢見林默娘乘著海湧把垃圾全丟進我的未來這件塑，好像是真的',
        type: '劇院',
        city: '台北市',
        date: '2024.03.22 20:15',
        people: '2/4',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
        image: '/assets/groupcard4.jpg',
    },
]

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
