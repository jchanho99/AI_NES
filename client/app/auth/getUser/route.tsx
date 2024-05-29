// getUser test
import { type NextRequest } from 'next/server'

export function POST(request: NextRequest) {
    const body = request.body;
    if (!body) return Response.error();
    return Response.json({
        "id": 3488590382,
        "connected_at": "2024-05-19T05:44:47Z",
        "kakao_account": {
            "has_email": true,
            "email_needs_agreement": false,
            "is_email_valid": true,
            "is_email_verified": true,
            "email": "seokyeo@kakao.com",
            "has_gender": true,
            "gender_needs_agreement": false,
            "gender": "male"
        },
        "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQ4ODU5MDM4MiwiaWF0IjoxNzE2NzA0MzE1LCJleHAiOjE3MTY3MDQzNzV9.kGshC-LCHrkc4f8uQnhbbP5TmhRoZ9SNxNb8D4ZB8JE"
    });
}