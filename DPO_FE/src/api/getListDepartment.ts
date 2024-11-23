import _axio from '@/utils/MyAxios';
async function getListDepartment() {
  try {
    const response = await _axio.get('Department/GetListDepartment');
    const data: Department[] = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching ListProcedure:', error);
    return null;
  }
}

export { getListDepartment };
