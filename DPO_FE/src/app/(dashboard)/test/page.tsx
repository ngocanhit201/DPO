'use client'
import Toastify from '@components/toastify';
import * as _react from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function NoticePage() {
  const toastifyRef = _react.useRef<{ notify: (type: string, message: string) => void }>(null);
  function  noti(){
    console.log("ok")
    toastifyRef.current?.notify('info', 'Nộp hồ sơ thành công')
    // toast.info("mess", {
    //   position: "top-center",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
  }

  return (
    <div>
      <Toastify ref={toastifyRef} />

      <div className='flex justify-center items-center'>
        <div className='w-1/2 h-24 bg-blue-900 flex justify-center items-center shadow-md rounded-md '>
          <p className='text-center font-bold normal-case text-white text-2xl'></p>
         <button onClick={noti}>click</button>
          <ToastContainer/>

        </div>
      </div>
    </div>
  );
}
