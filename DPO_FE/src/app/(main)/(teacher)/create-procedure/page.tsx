'use client'
import { withStyles } from '@mui/styles'
import  {getListDepartment} from '@/api/getListDepartment'
import  {getListPaper} from '@/api/getListPaper'
import {
  Button,
  FormControl,
  InputLabel, MenuItem, OutlinedInput,
  Paper, Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField
} from '@mui/material'
import React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'


export default function createProcedure() {
  const theme = useTheme()
  const [personName, setPersonName] = React.useState<string[]>([])
  const [listDepartment, setListDepartment] = React.useState<Department[]>([])
  const [listPaper, setListPaper] = React.useState<Paper[]>([])
  const  [selectPaper, setSelectPaper] = React.useState<string[]>([])
  const [level, setLevel] = React.useState<number>(1)
  const [inputValues, setInputValues] = React.useState<{ [key: number]: string }>({});
  React.useEffect(() => {
    async function fetchData() {
      let dataListdepartment = await getListDepartment()
      // @ts-ignore
      setListDepartment(dataListdepartment)
      let dataListPaper = await getListPaper()
      // @ts-ignore
      setListPaper(dataListPaper)
    }

    fetchData()
    console.log(listDepartment,listPaper)
  }, [])
  console.log(listDepartment,listPaper)

  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular
    }
  }

  const StyledTableCell = withStyles({
    root: {
      fontSize: '16px'
    }
  })(TableCell)
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event
    setSelectPaper(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  function  handleLevelChange(value:number|string){
    setLevel(Number(value))
  }
  // @ts-ignore
  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  // Function to handle button click
  const handleButtonClick = () => {
    listDepartment.forEach((item, index) => {
      console.log(`Input Value: ${inputValues[index] || ''}, Item Name: ${item.name}`);
    });
  };
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <TableContainer className="shadow-inner" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell className="bg-blue-900 text-white" colSpan={2} align="center">
                <h2>Thông tin thủ tục đăng ký</h2>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell><strong>Tên thủ tục</strong></StyledTableCell>
              <StyledTableCell>
                <TextField className='w-full' placeholder='Thủ tục' />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><strong>Mô tả</strong></StyledTableCell>
              <StyledTableCell>
                <TextField
                  placeholder="Mô tả"
                  multiline
                  rows={2}
                  // maxRows={4}
                  className='w-full'
                />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={1}>
                <strong>Danh sách giấy tờ yêu cầu</strong>
              </StyledTableCell>
              <StyledTableCell colSpan={1}>
                <div>
                  <FormControl variant="outlined"
                               style={{ width: "100%" }}>
                    <InputLabel id="test-select-label" className='bg-white'>Giấy tờ</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={selectPaper}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {listPaper.map((paper) => (
                        <MenuItem
                          key={paper.id}
                          value={paper.name}
                        >
                          {paper.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </StyledTableCell>

            </TableRow>
            <TableRow>
              <StyledTableCell><strong>Một số thông tin khác</strong></StyledTableCell>
              <StyledTableCell className='flex gap-5'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Level</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={level}
                    label="Level"
                    onChange={(e) => handleLevelChange(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </FormControl>
                <TextField className='w-full' placeholder='Phí' />
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><strong>Quy trình xử lý</strong></StyledTableCell>

              <StyledTableCell>
                <div>
                  <ul className='list-none'>
                    {listDepartment?.map((item, index) => (

                      <li key={index} className='py-1'>
                        <input type="text" name="" id=""
                               className='border-2 rounded-2xl  h-10 text-[16px] p-2 w-10 focus:outline-none text-center me-2'
                               onChange={(e) => handleInputChange(index, e.target.value)}
                               value={inputValues[index] || ''}
                        />
                        <strong>{item.name}</strong>
                      </li>

                    ))}


                  </ul>

                </div>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-center mt-20 mb-10'>
        <Button className='w-1/2' variant="contained" sx={{
          background: " rgb(30 64 175 )", ':hover': {
            bgcolor: 'rgb(24, 60, 140)', // theme.palette.primary.main
            color: 'white',
          },

        }
        }


        >Nộp hồ sơ</Button>
      </div>
    </div>
  )
}
