import Chart, { ChartOptions, ChartData } from '../../../node_modules/chart.js/auto/auto'
import { useRef, useEffect, useState } from "react";
interface  pieChartProps {
  data:number[],
  labels: string[]
}
export  default  function BarChart(props: pieChartProps) {


  useEffect(() => {
    new Chart(
      // @ts-ignore
      document.getElementById('barChart'),
      {
        type: 'bar',
        data: {
          labels: props.labels,
          datasets: [{
            label: 'My First Dataset',
            data: props.data,
            backgroundColor: [

              'rgba(75, 192, 192, 0.2)',

            ],
            borderColor: [

              'rgb(75, 192, 192)',

            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display:false
            },

          }
        }
      }
    );
  }, [])
  return (
    <>
      <div className='h-full w-full'>
        <canvas id="barChart"></canvas>
      </div>

    </>
  )
}
