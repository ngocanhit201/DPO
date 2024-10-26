import _axio from '@/utils/MyAxios';
async function getCaseByIdDepartment(idDepartment: number) {
    try {
        const response = await _axio.get('Cases/GetCasesByIdDepartment?queryIdDepartment=' + idDepartment);
        const data: AllCassInOne[] = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getCaseByIdDepartment;
