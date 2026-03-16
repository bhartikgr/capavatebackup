import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function RoundStatistics () {
  const data = {
    labels: ['Seed', 'Angel', 'VC', 'Private', 'Others'],
    datasets: [
      {
        data: [24.4, 14.7, 9.8, 22.7, 14.2],
        backgroundColor: [
          '#f45b78',
          '#2d98da',
          '#f6c85f',
          '#3bb3b3',
          '#82c341'
        ],
        borderWidth: 0
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%', 
    plugins: {
      legend: {
        position: 'bottom'
      },
      datalabels: {
        color: '#092840',
        font: {
          weight: '600',
          size: 14
        },
        formatter: value => value + '%'
      }
    }
  }

  return (
    <div className='investor-reports'>
      <div className='investor-reports__header'>
        <h4>Current Round Statistics</h4>
      </div>

      <div className='investor-reports__list'>
        <div className='round-chart'>
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  )
}
