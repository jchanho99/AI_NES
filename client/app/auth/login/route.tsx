// login test
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body) return Response.error();
    return Response.json(
        {
            "id": body.id,
            "jwt_token": "sample_token"
        }
    );
}