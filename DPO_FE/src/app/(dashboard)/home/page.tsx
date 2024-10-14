'use client';
import Table from '@mui/material/Table';
import _axio from '@/utils/MyAxios'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation'
import getListProcedure from '@/api/getListProcedure';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { UserContext } from '@/components/UserLayout';
export default function Page() {
  let [listProcedure, setListProcedure] = useState<Procedure[] | null>(null);
  const router = useRouter();

  const user = useContext(UserContext)
  if (user == null) {
    router.push('/login')
  };
  function handlePushToDetail(code: string) {
    router.push(`/procedure?code=${code}`);
  }
  useEffect(() => {
    async function fetchData() {
      let data = await getListProcedure();
      setListProcedure(data);
    }

    fetchData();

  }, []);
  return <>
    <div>
      <h1></h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">STT</TableCell>
              <TableCell align="left">Thủ tục</TableCell>
              <TableCell align="left">Lĩnh vực</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {listProcedure?.map((row, index) => (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className='hover:bg-gray-100 cursor-pointer'
                onClick={() => handlePushToDetail(row.code)}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  <div>
                    <h3 className='capitalize text-orange-400'>{row.name}</h3>
                    <p className='italic'> Level: {row.level}</p>
                  </div>
                </TableCell>
                <TableCell align="left">Cộng tác sinh viên</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>
}
