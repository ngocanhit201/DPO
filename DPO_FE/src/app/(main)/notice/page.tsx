'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';



export default function NoticePage() {
    const searchParams = useSearchParams()
    const [notice, setNotice] = useState<string | null>('');
    useEffect(() => {
        setNotice(pre => searchParams.get('mess'));


    }, [])


    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className='w-1/2 h-24 bg-blue-900 flex justify-center items-center shadow-md rounded-md '>
                    <p className='text-center font-bold normal-case text-white text-2xl'>{notice}</p>
                </div>
            </div>
        </div>
    );
}
