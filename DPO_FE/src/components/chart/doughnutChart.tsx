import Chart, { ChartOptions, ChartData } from '../../../node_modules/chart.js/auto/auto'
import { useRef, useEffect, useState } from "react";
interface  pieChartProps {
  data:number[],
  labels: string[]
}
export  default  function DoughnutChart(props: pieChartProps) {


  useEffect(() => {
    new Chart(
      // @ts-ignore
      document.getElementById('DoughnutChart'),
      {
        type: 'doughnut',
        data: {
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],

            }
          ]
        },
        options: {
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      }
    );
  }, [])
  return (
    <>
      <div className='h-full w-full'>
        <canvas id="DoughnutChart"></canvas>
      </div>

    </>
  )
}
