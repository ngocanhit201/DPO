import _axio from '@/utils/MyAxios';

async function loginApi(username: string, password: string) {
    try {
        const response = await _axio.get(`Auth/Login?username=${username}&password=${password}`);
        let data = response.data;
        return data as Account;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default loginApi;
