'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import getStudentById from './../../../../api/getStudentById'
import getDetailProcedure from '@/api/getDeltailProcedure'
import { useRouter } from 'next/navigation'
import getCaseById from '@/api/getCaseById'
import MyImage from '@components/Image'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import { makeStyles ,withStyles} from '@mui/styles'
import Stepper from '@components/Stepper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  } from '@mui/material'
import  getCaseProgress from '@/api/getCaseProgress'
export default function DetailCaseProcedure() {
  const searchParams = useSearchParams()
  const idProcedure = searchParams.get('idProcedure')
  const idStudent = searchParams.get('idStudent')
  const idCase = searchParams.get('idCase')
  const [thisStudent, setThisStudent] = useState<Student | null>(null)
  let [thisProcedure, setThisProcedure] = useState<Procedure | null>(null)
  let [thisCase, setThisCase] = useState<Case | null>(null)
  let [thisCaseProgress, setThisCaseProgress] = useState<CaseProgress[] | null>(null)
  const router = useRouter()
  const options = {

    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  }
  useEffect(() => {
    async function fetchData() {
      let dataStu = await getStudentById(Number(idStudent))
      setThisStudent(pre => dataStu)
      let dataPro = await getDetailProcedure(Number(idProcedure))
      setThisProcedure(pre => dataPro)
      let dataCase = await getCaseById(Number(idCase))
      setThisCase(pre => dataCase)
      let caseProgress = await getCaseProgress(Number(idCase))
      setThisCaseProgress(pre => caseProgress)
    }

    fetchData()

  }, [])
  const StyledTableCell = withStyles({
    root: {
      fontSize: "16px",
    },
  })(TableCell);
  console.log('caseProgress', thisCaseProgress)
  return (
    <div className=''>
      <div className="bg-white shadow-md rounded-md p-4  " >
        <TableContainer className='shadow-inner' component={Paper} >
           <Table>
             <TableHead>
               <TableRow>
                 <StyledTableCell  className='bg-blue-900 text-white' colSpan={2} align="center"  >
                   <h2 >Thông tin thủ tục đăng ký</h2>
                 </StyledTableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               <TableRow >
                 <StyledTableCell ><strong>Tên thủ tục</strong></StyledTableCell>
                 <StyledTableCell>{thisProcedure?.name}</StyledTableCell>
               </TableRow>
               <TableRow>
                 <StyledTableCell colSpan={2}>
                   <strong>Danh sách giấy tờ yêu cầu</strong>
                 </StyledTableCell>
               </TableRow>
               <TableRow>
                 <StyledTableCell colSpan={2}>
                   <ol style={{ paddingLeft: '20px' }}>
                     {thisProcedure?.idPapers.map((doc, index) => (
                       <li key={index}>{doc.name}</li>
                     ))}
                   </ol>
                 </StyledTableCell>
               </TableRow>
             </TableBody>
           </Table>
        </TableContainer>
        <br/>
        <div>

          <TableContainer className='shadow-inner my-2' component={Paper}>
            <Table>
              <TableHead>
              <TableRow>
                <StyledTableCell className='bg-blue-900 text-white'  colSpan={2} align="center">
                  <h2>Thông tin sinh viên đăng ký</h2>
                </StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>Họ và tên</StyledTableCell>
                  <StyledTableCell>{thisStudent?.name}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Mã sinh viên</StyledTableCell>
                  <StyledTableCell>{thisStudent?.id}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Ngành học</StyledTableCell>
                  <StyledTableCell>{thisStudent?.major}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Lớp học</StyledTableCell>
                  <StyledTableCell>{thisStudent?.class}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Ngày sinh</StyledTableCell>
                  <StyledTableCell>{thisStudent?.birthday}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Giới tính</StyledTableCell>
                  <StyledTableCell>{thisStudent?.isMale ? 'Nam' : 'Nữ'}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Quê quán</StyledTableCell>
                  <StyledTableCell>{thisStudent?.hometown}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <p className='italic'>Giấy tờ đã gửi:</p>
          <div className=''>
            <Gallery options={options}>
              {thisCase?.files.map((f, index) => (
                <MyImage url={f.url} key={index} />
              ))}
            </Gallery>

          </div>
          <div>
            {thisProcedure && <Stepper caseProgress={thisCaseProgress} />}
          </div>
        </div>
      </div>
    </div>
  )
}
