'use client';
import React, { forwardRef, useImperativeHandle } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props: any, ref: any) {

    const notify = (type: string, mess: string) => {
        if (type == 'info') {
            toast.info(mess, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (type == 'error') {
            toast.error(mess, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (props.type == 'warn') {
            toast.warn(props.mess, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }



    }
    useImperativeHandle(ref, () => ({
        notify
    }));
    return (
        <div>
            <ToastContainer

            />
            {/* Same as */}
        </div>
    );
}
export default forwardRef(App);
