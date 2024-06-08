import axios from "axios";

interface RegitserRequest{
    id: string;
    email: string;
    password: string;
}

export default async function NativeRegister(regitserRequest: RegitserRequest): Promise<Boolean> {
    try{
        const response = await axios.post<Boolean>("/service/auth/signup", regitserRequest);
		if(!response.data || response.status != 201){
			console.log(response);
		}
        return response.data;
    }
    catch(err){
        console.error(err);
        return false;
    }
}