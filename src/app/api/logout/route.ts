import { cookies } from 'next/headers'

import { NextResponse, NextRequest } from 'next/server'

// api/logout
export async function POST(request: NextRequest) {
    const path = request.nextUrl.origin

    try {
        cookies().delete('token')
        return NextResponse.json({})
    } catch (error) {
        return new Response('Error', { status: 500 })
    }
}
