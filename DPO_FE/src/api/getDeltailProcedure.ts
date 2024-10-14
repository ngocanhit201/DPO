import _axio from '@/utils/MyAxios';

async function getDetailProcedure(code: string) {
    try {
        const response = await _axio.get('Procedures/GetByProcedureCode?code=' + code);
        let data = response.data;
        return data as Procedure;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getDetailProcedure;
