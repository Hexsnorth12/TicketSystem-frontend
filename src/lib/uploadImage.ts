import { BASE_URL } from '@/definitions'

const upLoadImage = async (
    formData: FormData,
    category: string,
    token: string,
) => {
    try {
        const { data, status, message } = await fetch(
            `${BASE_URL}api/v1/uploadFile/photo/${category}`,
            {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            },
        ).then((res) => res.json())

        if (status === '6513') {
            return {
                isSuccess: false,
                message,
            }
        }

        return {
            isSuccess: true,
            url: data.url,
        }
    } catch (error) {
        console.log('error', error)
    }
}

export default upLoadImage
