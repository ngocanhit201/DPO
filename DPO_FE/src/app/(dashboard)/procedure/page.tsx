'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { List } from 'postcss/lib/list';
import { useEffect, useState } from 'react';
import getDetailProcedure from '@/api/getDeltailProcedure';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ProcedureForm from '@/components/ProcedureForm';
export default function Page() {
    const searchParams = useSearchParams()
    let [procedure, setprocedure] = useState<Procedure | null>(null);
    const code = searchParams.get('code') || '';
    useEffect(() => {
        async function fetchData() {
            let data = await getDetailProcedure(code);
            setprocedure(pre => data);
        }
        fetchData();

    }, [])
    return (
        <>
            {procedure && <ProcedureForm procedure={procedure} />}
        </>
    );
}
