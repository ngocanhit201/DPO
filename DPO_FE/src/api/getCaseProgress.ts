import _axio from '@/utils/MyAxios';
async function getCaseProgress(id: number) {
  try {
    const response =
      await _axio.get('Cases/GetCaseProgress?idCase=' + id);
    const caseProgress: CaseProgress[] = response.data;
    return caseProgress;
  } catch (error) {
    console.error('Error fetching GetCaseProgress:', error);
    return null;
  }
}

export default getCaseProgress;
