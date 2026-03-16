import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../../config/config';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

// fallback colors
const CHART_COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
  '#8AC926', '#1982C4', '#6A0572'
];

// FIXED TYPE COLORS
const TYPE_COLOR_MAP = {
  founder: '#36A2EB',
  option_pool: '#4BC0C0',
  pending: '#FFC107',
  new_investor: '#8AC926',
  converted: '#9966FF',
  previous_investor: '#FF6384'
};

export default function RoundStatistics() {

  const apiUrlRound = API_BASE_URL + "api/user/companydashboard/";
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = storedUsername ? JSON.parse(storedUsername) : null;

  const [postMoneyChartData, setPostMoneyChartData] = useState(null);

  const [postMoneyChartOptions, setPostMoneyChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { position: 'bottom' }
    }
  });

  useEffect(() => {
    getroundChart();
  }, []);

  const getroundChart = async () => {

    let formData = {
      company_id: userLogin.companies[0].id,
    };

    try {

      const res = await axios.post(
        apiUrlRound + "getroundChart",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const capTable = res.data.cap_table || {
        post_money: { items: [] }
      };

      if (capTable?.post_money?.items?.length > 0) {

        const expandedItems = [];

        capTable.post_money.items.forEach((item, originalIndex) => {

          if (item.type === 'investor') {

            const inv = item.investor_details || {};
            const name =
              `${inv.firstName || ''} ${inv.lastName || ''}`.trim()
              || item.name
              || 'Investor';

            expandedItems.push({
              ...item,
              _displayName: `👤 ${name}`,
              _shares: item.shares || 0,
              _type: 'investor',
              _isNew: item.is_new_investment,
              _isPrevious: item.is_previous,
              _isConverted: item.is_converted
            });
          }

          else if (item.type === 'founder') {

            expandedItems.push({
              ...item,
              _displayName: `${item.name}`,
              _shares: item.shares || 0,
              _type: 'founder'
            });

          }

          else if (item.type === 'option_pool') {

            expandedItems.push({
              ...item,
              _displayName: 'Employee Option Pool',
              _shares: item.shares || 0,
              _type: 'option_pool'
            });

          }

          else if (item.type === 'pending_group') {

            const investors = item.items || [];

            investors.forEach(inv => {

              expandedItems.push({
                ...inv,
                _displayName: `⏳ ${inv.name}`,
                _shares: 0,
                _type: 'pending'
              });

            });

          }

        });

        const totalShares = expandedItems.reduce(
          (sum, item) => sum + (item._shares || 0),
          0
        );

        const postMoneyData = {

          labels: expandedItems.map(item => item._displayName),

          datasets: [{
            label: 'Shares',

            data: expandedItems.map(item => item._shares),

            backgroundColor: expandedItems.map((item, i) => {

              if (item._type === 'founder')
                return TYPE_COLOR_MAP.founder;

              if (item._type === 'option_pool')
                return TYPE_COLOR_MAP.option_pool;

              if (item._type === 'pending')
                return TYPE_COLOR_MAP.pending;

              if (item._isNew)
                return TYPE_COLOR_MAP.new_investor;

              if (item._isConverted)
                return TYPE_COLOR_MAP.converted;

              if (item._isPrevious)
                return TYPE_COLOR_MAP.previous_investor;

              return CHART_COLORS[i % CHART_COLORS.length];

            }),

            borderWidth: 1,
          }],

          _expandedItems: expandedItems

        };

        setPostMoneyChartData(postMoneyData);

        createDynamicChartOptions(expandedItems, totalShares);

      }

    }
    catch (err) {

      console.error("Error fetching chart:", err);

    }
  };

  const createDynamicChartOptions = (expandedItems, totalShares) => {

    const dynamicOptions = {

      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',

      plugins: {

        legend: {

          position: 'bottom',

          labels: {

            generateLabels: () => {

              const types = {};

              expandedItems.forEach(item => {

                let type = 'Other';

                if (item._type === 'founder') type = 'Founders';
                else if (item._type === 'option_pool') type = 'Option Pool';
                else if (item._type === 'pending') type = 'Pending SAFE';
                else if (item._isNew) type = 'New Investors';
                else if (item._isConverted) type = 'Converted';
                else if (item._isPrevious) type = 'Previous Investors';

                types[type] = (types[type] || 0) + (item._shares || 0);

              });

              return Object.keys(types)
                .filter(type => types[type] > 0) // ✅ hide 0 value
                .map((type, i) => {

                  const percentage = ((types[type] / totalShares) * 100).toFixed(2);

                  let color = CHART_COLORS[i];

                  if (type === 'Founders') color = TYPE_COLOR_MAP.founder;
                  if (type === 'Option Pool') color = TYPE_COLOR_MAP.option_pool;
                  if (type === 'Pending SAFE') color = TYPE_COLOR_MAP.pending;
                  if (type === 'New Investors') color = TYPE_COLOR_MAP.new_investor;
                  if (type === 'Converted') color = TYPE_COLOR_MAP.converted;
                  if (type === 'Previous Investors') color = TYPE_COLOR_MAP.previous_investor;

                  return {
                    text: `${type} (${percentage}%)`,
                    fillStyle: color,
                    strokeStyle: 'transparent',
                    hidden: false,
                    index: i
                  };
                });
            }

          }

        },

        tooltip: {

          callbacks: {

            label: (context) => {

              const value = context.raw || 0;

              const percentage =
                totalShares > 0
                  ? ((value / totalShares) * 100).toFixed(2)
                  : 0;

              return `${context.label}: ${value.toLocaleString()} shares (${percentage}%)`;

            }

          }

        },

        datalabels: {

          color: '#092840',

          font: {
            weight: '600',
            size: 12
          },

          formatter: (value) => {

            const percentage =
              totalShares > 0
                ? ((value / totalShares) * 100).toFixed(2)
                : 0;

            return parseFloat(percentage) > 2
              ? percentage + '%'
              : '';

          }

        }

      }

    };

    setPostMoneyChartOptions(dynamicOptions);

  };

  return (

    <div className='investor-reports'>

      <div className='investor-reports__header'>
        <h4>Current Round Statistics</h4>
      </div>

      <div className='investor-reports__list'>

        <div className='round-chart' style={{ height: "420px" }}>

          {postMoneyChartData ? (

            <Doughnut
              data={postMoneyChartData}
              options={postMoneyChartOptions}
            />

          ) : (

            <div>Loading chart data...</div>

          )}

        </div>

      </div>

    </div>

  );

}