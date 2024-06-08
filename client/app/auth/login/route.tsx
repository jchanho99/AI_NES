// login test
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body) return Response.error();
    const response = 
        {
            "id": body.id,
            "jwt_token": "sample_token"
        };

    return new NextResponse(JSON.stringify(response), {status: 201});
}