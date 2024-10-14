import _axio from '@/utils/MyAxios';
async function getListResultFrom() {
    try {
        const response = await _axio.get('ResultFroms/GetResultFroms');
        const data: ResultFrom[] = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getListResultFrom;
