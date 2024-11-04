import _axio from '@/utils/MyAxios';
async function getStatusCaseForDepartment(idDepartment: number, idCase: number) {
  try {
    const response = await _axio.get(`Cases/GetStatusCaseForDepartment?idDepartment=${idDepartment}&idCase=${idCase}`);
    const data: string = response.data;
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default getStatusCaseForDepartment;
