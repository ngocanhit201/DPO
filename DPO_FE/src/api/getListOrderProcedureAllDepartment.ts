import _axio from '@/utils/MyAxios';
export async function getListOrderProcedureAllDepartment() {
  try {
    const response = await _axio.get('Procedures/ListOrderProcedureAllDepartment');
    const data: [[]] = response.data;
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


