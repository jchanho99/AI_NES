import axios, { AxiosError } from "axios";

interface RegitserRequest {
    id: string;
    email: string;
    password: string;
}

interface RegisterResult {
    success: boolean;
    status: number;
}

export default async function NativeRegister(regitserRequest: RegitserRequest): Promise<RegisterResult> {
    try {
        const response = await axios.post("/service/auth/signup", regitserRequest);
        if (response.data === true) {
            return {
                success: true,
                status: response.status
            };
        }
        else {
            return {
                success: false,
                status: response.status
            }
        }
    }
    catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)){
            return {
                success: false,
                status: err.response?.status as number
            };
        }
        else {
            return {
                success: false,
                status: 500
            };
        }
    }
}