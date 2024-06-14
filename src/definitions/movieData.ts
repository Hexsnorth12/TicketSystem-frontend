import { Ticket, TicketDetail } from '@/types'

export const Popcards = [
    {
        id: 1,
        name: '熱門電影名稱1',
        type: '劇情片',
        rank: 1,
        image: '/assets/popcard1.jpg',
        price: 800,
    },
    {
        id: 2,
        name: '熱門電影名稱2',
        type: '喜劇片',
        rank: 2,
        image: '/assets/popcard2.jpg',
        price: 700,
    },
    {
        id: 3,
        name: '熱門電影名稱3',
        type: '動作片',
        rank: 3,
        image: '/assets/popcard3.jpg',
        price: 600,
    },
    {
        id: 4,
        name: '熱門電影名稱4',
        type: '科幻片',
        rank: 4,
        image: '/assets/popcard4.jpg',
        price: 800,
    },
    {
        id: 5,
        name: '熱門電影名稱5',
        type: '愛情片',
        rank: 5,
        image: '/assets/popcard5.jpg',
        price: 500,
    },
]

export const Reccards = [
    {
        name: '金剛大戰哥吉拉3',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard1.jpg',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
    },
    {
        name: '周處除三害',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard2.jpg',
        content:
            '老舊的想法已經過時了。伏爾泰曾經說過，最長的莫過於時間，因為它永遠無窮盡，最短的也不莫過於時間，因為我們所有的計劃都來不及完成。這段話看似複雜，其中的邏輯思路卻清晰可見。世界需要改革，需要對電影評價有新的認知。對於電影評價，我們不能不去想，卻也不能走火入魔。',
    },
    {
        name: '007 : 量子危機',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard3.jpg',
        content:
            '因此，阿波需要幫手。這時狡猾又機智的小偷小真（金球獎得主奧卡菲娜飾）出現了，這隻沙狐經常惹毛阿波，但她高超的技巧總是派得上用場。這對歡喜冤家必須同心協力，保衛和平谷遠離變色龍的魔掌。',
    },
    {
        name: '復仇者聯盟4：終局之戰',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard4.jpg',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
    },
    {
        name: '功夫熊貓4',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard5.jpg',
        content:
            '功夫熊貓4本片導演為《魔髮精靈》麥克米契，共同導演為《神娃之伊莎莉亞戰記》史蒂芬妮瑪史汀，在2008年，入圍奧斯卡獎的第一部《功夫熊貓》成為夢工廠動畫票房最高的原創動畫電影，系列作品全球票房收入超過18億美元',
    },
    {
        name: '可憐的東西',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard6.jpg',
        content:
            '奧斯卡獎入圍者布萊恩克雷斯頓飾演阿波的生父老李；以及艾美獎入圍者伊恩麥克夏恩飾演殘豹，他是師父過去的徒弟和宿敵。奧斯卡獎得主《媽的多重宇宙》關繼威也加入卡司群，為新角色盜賊巢穴老大獻聲。',
    },
    {
        name: '蒼鷺與少年',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard7.jpg',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
    },
    {
        name: '007 : 量子危機',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard8.jpg',
        content:
            '因此，阿波需要幫手。這時狡猾又機智的小偷小真（金球獎得主奧卡菲娜飾）出現了，這隻沙狐經常惹毛阿波，但她高超的技巧總是派得上用場。這對歡喜冤家必須同心協力，保衛和平谷遠離變色龍的魔掌。',
    },
    {
        name: '周處除三害',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard9.jpg',
        content:
            '老舊的想法已經過時了。伏爾泰曾經說過，最長的莫過於時間，因為它永遠無窮盡，最短的也不莫過於時間，因為我們所有的計劃都來不及完成。這段話看似複雜，其中的邏輯思路卻清晰可見。世界需要改革，需要對電影評價有新的認知。對於電影評價，我們不能不去想，卻也不能走火入魔。',
    },
    {
        name: '復仇者聯盟4：終局之戰',
        ticket: '票券',
        city: '台北市',
        image: '/assets/reccard10.jpg',
        content:
            '另外，還有陰謀論者認為，《帝國浩劫：美國內戰》其實是「影子政府」的「預示性調控」（Predictive Programming），讓美國民眾為即將到來的真正內戰做好心理準備。劇情虛實難辨的《帝國浩劫：美國內戰》，或許正是如今紛亂的世界最需要的電影！',
    },
]

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
