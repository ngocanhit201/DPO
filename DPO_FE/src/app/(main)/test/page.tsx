'use client'
import Toastify from '@components/toastify';
import * as _react from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PieChart from '@components/chart/doughnutChart'
export default function NoticePage() {


  return (
    <div>
     <PieChart data={[3,4,5]} labels={["a","b","c"]}></PieChart>
    </div>
  );
}
