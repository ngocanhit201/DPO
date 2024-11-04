import _axio from '@/utils/MyAxios'

async function approveCase(idDepartment:number,idCase:number,idStatus:number) {
  try {
    const response =
      await _axio.post(`Cases/ApproveCase?idCase=${idCase}&idDepartment=${idDepartment}&statusCode=${idStatus}`)
    const data:number  = response.data
    return data
  } catch (error) {
    console.error('Error fetching:', error)
    return null
  }
}

export default approveCase
