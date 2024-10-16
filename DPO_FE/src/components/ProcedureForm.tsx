interface ProcedureProp {
    procedure: Procedure;

}

import * as _react from 'react';
import getListResultFrom from '@/api/getListResultFrom';
import { createStyles, FormControl, MenuItem, Select, withStyles, makeStyles, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import FileUpload from '@/components/FileUpload';
import createCase from '@/api/createCase';
import { UserContext } from './UserLayout';
import Toastify from './toastify';
import { useRouter } from 'next/navigation'

export default function page(props: ProcedureProp) {
    let [resultFrom, setResultFrom] = _react.useState<ResultFrom[] | null>(null)
    let [userResultFrom, setUserResultFrom] = _react.useState<number | null>(1)
    const [fileUpload, setfileUpload] = _react.useState([]);
    const toastifyRef = _react.useRef<{ notify: (type: string, message: string) => void }>(null);
    const router = useRouter();
    const handleFileUpload = (value: any) => {
        setfileUpload(value);
        console.log('setfileUpload', value)
    };
    const thisUser = _react.useContext(UserContext);
    _react.useEffect(() => {
        async function fetchData() {
            let data = await getListResultFrom();
            setResultFrom(pre => data);
        }
        fetchData();

    }, [])
    function handleChangeResultFrom(e: any) {
        setUserResultFrom(pre => e.target.value);
        console.log(e.target.value)

    }
    async function handleCreateCase() {
        let result = await createCase(thisUser?.account?.id ?? 0, props.procedure.id, userResultFrom ?? 0, fileUpload)
        console.log('result', result)
        if (result?.status == 200) {
            toastifyRef.current?.notify('success', 'Nộp hồ sơ thành công')
            router.push('/notice?mess=' + 'Nộp hồ sơ thành công, thủ tục đang được xử lý')
        } else {
            toastifyRef.current?.notify('error', 'Có lỗi xảy ra')

        }
    }
    return (
        <div className="w-full h-full shadow-sm rounded-lg overflow-hidden">
            <Toastify ref={toastifyRef} />
            <div className=" bg-blue-800 py-2">
                <h1 className=" text-white text-center capitalize">{props.procedure.name}</h1>
            </div>
            <div className="px-5 flex flex-col gap-1">
                <h3 className="">Thông tin thủ tục</h3>
                <div className='flex gap-1' >
                    <p className='font-bold'>Mô tả: </p>
                    <p>{props.procedure.description}</p>
                </div>
                <div className='flex gap-1' >
                    <p className='font-bold'>Phí: </p>
                    <p> {props.procedure.fee} vnd</p>
                </div>
                <div className='flex gap-1 items-center' >
                    <p className='font-bold'>Hình thức trả kết quả: </p>
                    <div>
                        <FormControl sx={{ minWidth: 50 }} size="small">
                            <Select
                                value={userResultFrom}
                                onChange={handleChangeResultFrom}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                MenuProps={{
                                    sx: {
                                        "&& .Mui-selected": {
                                            color: "black",
                                            background: "Unset",
                                        },
                                        "& .MuiMenuItem-root.Mui-selected:hover": {
                                            backgroundColor: "lightgray", // Optional: set hover color for the selected item
                                        },
                                    },
                                }}
                                sx={{
                                    "& [aria-expanded=true]": {
                                        background: "unset",
                                    },
                                    '.MuiOutlinedInput-notchedOutline': { borderColor: "#333" },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "#333", borderWidth: "1px" },
                                    '.MuiSvgIcon-root ': {
                                        fill: "white !important",
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'black',
                                    },



                                }}

                            >

                                {resultFrom?.map((item, index) => (
                                    <MenuItem key={index} value={item.id}
                                    >{item.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='flex gap 1  flex-col '>
                    <p className='font-bold'>Giấy tờ cần bổ xung</p>
                    <List sx={{ listStyle: "decimal", pl: 4 }}>
                        <div className='ps-5'>

                            {props.procedure.idPapers.map((item, index) => (
                                <ListItem className='ps-1' sx={{ display: "list-item", paddingLeft: '10px' }}>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            ))}
                        </div>
                    </List>


                    <form>
                        <FileUpload onValueChange={handleFileUpload} />
                    </form>

                    <div className='flex justify-center mt-20 mb-10'>
                        <Button className='w-1/2' variant="contained" sx={{
                            background: " rgb(30 64 175 )", ':hover': {
                                bgcolor: 'rgb(24, 60, 140)', // theme.palette.primary.main
                                color: 'white',
                            },

                        }
                        }
                            onClick={handleCreateCase}

                        >Nộp hồ sơ</Button>
                    </div>
                </div>

            </div>
        </div>
    )


}

