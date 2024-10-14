import _axio from '@/utils/MyAxios';
async function getListProcedure() {
    try {
        const response =
            await _axio.get('Procedures/ListProcedure');
        const ListProcedure: Procedure[] = response.data;
        return ListProcedure;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getListProcedure;
