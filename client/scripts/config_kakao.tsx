const client_id = "4cd5fc26952d49440e11fc996c48a00f";
const redirect_uri = "http://localhost:3000/login/kakao";

export const KakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;