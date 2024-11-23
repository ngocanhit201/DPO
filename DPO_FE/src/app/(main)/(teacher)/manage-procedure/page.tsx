'use client'
import React, { useEffect } from 'react'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import { withStyles } from '@mui/styles'
import { getListDepartment } from '@/api/getListDepartment'
import { getListOrderProcedureAllDepartment } from '@/api/getListOrderProcedureAllDepartment'

export default function ManageProcedure() {
  const [listDepartment, setListDepartment] = React.useState<Department[] | null>([])
  const [listOrderProcedureAllDepartment, setListOrderProcedureAllDepartment] = React.useState<[[]] | null>(null)

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein }
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]
  const StyledTableCell = withStyles({
    root: {
      fontSize: '17px'
    }
  })(TableCell)
  useEffect(() => {
    async function fetchData() {
      let dataListdepartment = await getListDepartment()
      setListDepartment(dataListdepartment)
      let dataListOrderProcedureAllDepartment = await getListOrderProcedureAllDepartment()
      setListOrderProcedureAllDepartment(dataListOrderProcedureAllDepartment)
    }

    fetchData()
  }, [])
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h1>Quản lý thủ tục</h1>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tên thủ tục </StyledTableCell>
              {listDepartment?.map((department) => (
                <StyledTableCell align="center">{department.name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listOrderProcedureAllDepartment?.map((row,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map ((item,index) => (
                  <StyledTableCell key={index} className={`text-center ${index==0?'!text-left':''}`} >
                    {item}
                  </StyledTableCell>
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
