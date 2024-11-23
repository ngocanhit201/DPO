import _axio from '@/utils/MyAxios';
async function getListPaper() {
  try {
    const response = await _axio.get('Paper/GetListPaper');
    const data: Paper[] = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching ListProcedure:', error);
    return null;
  }
}

export { getListPaper };
