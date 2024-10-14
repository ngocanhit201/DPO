'use client'
import { Box, Button, Card, FormControl, FormLabel, Link, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import loginApi from './../../../api/loginApi';
import { setCookieNoTime, getCookie, getAccFromCookie } from '../../../utils/getSetCookie';
import { json } from "stream/consumers";
import { useRouter } from 'next/navigation'

export default function page() {
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [account, setAccount] = useState<Account>();
    const router = useRouter();

    function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(pre => e.target.value);
    }
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(pre => e.target.value);
    };
    useEffect(() => {


    }, []);
    function handleLogin() {
        async function fetchData() {
            let account = await loginApi(username, password)
            if (account) {
                setAccount(pre => account);
                setCookieNoTime('account', account);

            }
            let myacc = getAccFromCookie();
            if (myacc?.idStudent != null) {
                router.push('/home')
            }
        }

        fetchData();
    }
    return (
        <div className="">
            <div className="h-screen flex justify-center items-center">
                <div className="w-[500px]">
                    <Card variant="outlined" sx={{ padding: "70px 50px" }}>

                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >
                            Đăng nhập
                        </Typography>
                        <FormControl className="w-full">
                            <FormLabel htmlFor="email">Mã sinh viên</FormLabel>
                            <TextField
                                id="email"
                                name="email"
                                placeholder="xxxx"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                sx={{ ariaLabel: 'email' }}
                                className="w-full"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </FormControl>
                        <br />
                        <FormControl className="w-full">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="password">Password</FormLabel>

                            </Box>
                            <TextField

                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        <Button variant="contained" className='my-5' onClick={handleLogin}>Đăng nhập</Button>
                    </Card>

                </div>
            </div>
        </div>
    )
}
