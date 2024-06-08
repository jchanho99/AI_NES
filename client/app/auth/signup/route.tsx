// signup test
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body) return Response.error();
    
    return new NextResponse(JSON.stringify(true), {status: 201});
}