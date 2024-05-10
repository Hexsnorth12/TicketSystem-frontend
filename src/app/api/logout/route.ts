import { cookies } from 'next/headers'

import { NextResponse } from 'next/server'

// api/logout
export async function POST() {
    try {
        cookies().delete('token')
        return NextResponse.json({})
    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}
