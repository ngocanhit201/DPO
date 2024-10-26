import _axio from '@/utils/MyAxios';
async function getStudentById(id: number) {
    try {
        const response = await _axio.get('Students/' + id);
        const data: Student = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching ListProcedure:', error);
        return null;
    }
}

export default getStudentById;
