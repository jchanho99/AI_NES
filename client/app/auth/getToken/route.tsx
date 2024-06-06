// getToken test
import { NextResponse, type NextRequest } from 'next/server'

export function POST(request: NextRequest) {
    const body = request.body;
    if(!body) return Response.error();
    const response =
        {
            "access_token": "ACCESS_TOKEN",
            "token_type": "bearer",
            "refresh_token": "REFRESH_TOKEN",
            "id_token": "TOKEN_VALUE",
            "expires_in": 21599,
            "scope": "openid",
            "refresh_token_expires_in": 5183999
        };

    return new NextResponse(JSON.stringify(response), {status: 201});
}