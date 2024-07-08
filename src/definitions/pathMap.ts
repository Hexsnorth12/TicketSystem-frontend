type Map = {
    [T: string]: { [T: string]: string }
}

export const pathMap: Map = {
    home: {
        path: '/',
        name: '首頁',
    },
    user: {
        path: '/user/tickets',
        name: '會員中心',
    },
    info: {
        path: '/user/info',
        name: '會員中心',
    },
    tickets: {
        path: '/user/tickets',
        name: '我的電影票',
    },
    favorites: {
        path: '/user/favorites',
        name: '我的收藏',
    },
    comments: {
        path: '/user/comments',
        name: '我的評論',
    },
    sharedTicket: {
        path: '/user/sharedTicket',
        name: '線上分票',
    },
    myoOrganize: {
        path: '/user/myoOrganize',
        name: '我的揪團',
    },
    publish: {
        path: '/user/publish',
        name: '上架分票',
    },
    notfound: {
        path: '/search/notfound',
        name: '找無商品',
    },
    productresult: {
        path: '/search/productresult',
        name: '商品搜尋結果',
    },
    groupresult: {
        path: '/search/groupresult',
        name: '揪團搜尋結果',
    },
    ticketresult: {
        path: '/search/ticketresult',
        name: '票券搜尋結果',
    },
}

export const memberPath = [
    ['info', '會員資料'],
    ['/user/tickets?status=unverified', '我的電影票'],
    ['favorites', '我的收藏'],
    ['comments', '我的評論'],
    ['join', '我的揪團'],
    ['sharedTicket', '線上分票'],
]
