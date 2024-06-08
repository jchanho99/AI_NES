const client_id = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
const redirect_uri = process.env.NEXT_PUBLIC_SERVER_URL + "/login/kakao";
const scope = (process.env.NEXT_PUBLIC_API_URL == "http://localhost:3000") ? "" : "&scope=account_email,gender";

export const KakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}${scope}`;