'use client';
import getCaseByIdDepartment from '@/api/teacher/getCasesByIdDepartment';
import { UserContext } from '@/components/UserLayout';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { use, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function procedureforme() {
    let user = useContext(UserContext);
    let router = useRouter();
    console.log("myuser", user)
    let [cases, setCases] = useState<AllCassInOne[] | null>(null);
    useEffect(() => {
        async function fetchData() {
            console.log(user?.account);
            let data = await getCaseByIdDepartment(user?.account?.idDepartment || 0);
            setCases(data);

        }
        fetchData();

    }, [user]);
    function handlePushToDetail(row: AllCassInOne) {
        router.push('/detail-case-procedure?idProcedure=' + row.procedure.id + '&idStudent=' + row.student.id+'&idCase=' + row.case.id);
    }
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">STT</TableCell>
                            <TableCell align="left">Thủ tục</TableCell>
                            <TableCell align="left">Người gửi</TableCell>
                            <TableCell align="left">Thời gian tiếp nhận</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {cases?.map((row, index) => (
                            <TableRow
                                key={row.case.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className='hover:bg-gray-100 cursor-pointer'
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left" onClick={e => handlePushToDetail(row)}>
                                    <div>
                                        <h3 className='capitalize text-orange-400' >{row.procedure.name}</h3>
                                    </div>
                                </TableCell>
                                <TableCell align="left"><p>{row.student.name}</p></TableCell>
                                <TableCell align="left"><p>{row.case.dateCreate.toString()}</p></TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
