// logout test
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body) return Response.error();
    return Response.json(
        {
            "id": "1234567",
        }
    );
}