import { BASE_URL } from '@/definitions'

const upLoadImage = async (
    formData: FormData,
    category: string,
    token: string,
) => {
    try {
        const { data } = await fetch(
            `${BASE_URL}api/v1/uploadFile/photo/${category}`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        ).then((res) => {
            if (res.ok) return res.json()
        })

        return data.url
    } catch (error) {
        console.log('error', error)
    }
}

export default upLoadImage
