import _axio from '@/utils/MyAxios';
async function getCaseById(id: number) {
  try {
    const response = await _axio.get('Cases/GetCase/'+id);
    const data:Case= response.data;
    return data;
  } catch (error) {
    console.error('Error fetching ListProcedure:', error);
    return null;
  }
}

export default getCaseById;
