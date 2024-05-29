// getToken test
import { type NextRequest } from 'next/server'

export function POST(request: NextRequest) {
    const body = request.body;
    if(!body) return Response.error();
    return Response.json(
        {
            "access_token": "ACCESS_TOKEN",
            "token_type": "bearer",
            "refresh_token": "REFRESH_TOKEN",
            "id_token": "TOKEN_VALUE",
            "expires_in": 21599,
            "scope": "openid",
            "refresh_token_expires_in": 5183999
        }
    );
}