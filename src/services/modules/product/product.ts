export interface CommentPayload {
    productId: string
    rating: number
    content: string
    status: string
}

//    "_id": "665b0ac317dba1ca40af0c6a",
// "rating": 5,
// "content": "宇宙讚讚 A",
// "status": "disabled",
// "createdAt": "2024-06-12T16:49:17.401Z",
// "updatedAt": "2024-06-12T16:49:17.401Z",
// "productId": "664637559f1b5efbad4c8b16",
// "userId": "66423369996f95232548cb91"

export interface CommentData {
    _id: string
    rating: number
    content: string
    status: string
    createdAt: string
    updatedAt: string
    productId: string
    userId: string
}

export interface IMeta {}
