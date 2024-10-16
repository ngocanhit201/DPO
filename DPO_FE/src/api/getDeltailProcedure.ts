import _axio from '@/utils/MyAxios';

async function getDetailProcedure(id: number) {
    try {
        const response = await _axio.get('Procedures/GetByProcedureById?id=' + id);
        let data = response.data;
        return data as Procedure;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getDetailProcedure;
