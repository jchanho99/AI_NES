import axios from "axios";
import { ServiceUri } from "../config_native";

interface RegitserRequest{
    id: string;
    email: string;
    password: string;
}

interface RegitserResult{
    success: boolean;
}

export default async function NativeRegister(regitserRequest: RegitserRequest): Promise<Boolean> {
    try{
        const response = await axios.post<RegitserResult>(ServiceUri + "auth/signup", regitserRequest);
        return response.data.success;
    }
    catch(err){
        console.error(err);
        return false;
    }
}