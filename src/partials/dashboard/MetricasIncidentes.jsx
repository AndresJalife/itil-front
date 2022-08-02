import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


Date.prototype.subDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}


function MetricasIncidentes({
  incidentes
  }) {
  
  var today = new Date();
  var week = [
      today.subDays(5), today.subDays(4), today.subDays(3),
      today.subDays(2), today.subDays(1), today,
  ];
  var totales = week.map(
    day => incidentes.filter(
      i => ((new Date(i.created_on)).getDate() === day.getDate()) &&
           ((new Date(i.created_on)).getMonth() === day.getMonth())).length
  );
  var sin_resolver = week.map(
    day => incidentes.filter(
      i => ((new Date(i.created_on)).getDate() === day.getDate()) &&
           ((new Date(i.created_on)).getMonth() === day.getMonth()) &&
           (i.status != 'RESUELTO')).length
  );

  const chartData = {
    labels: week,
    datasets: [
      // Light blue bars
      {
        label: 'Totales',
        data: totales,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Sin Resolver',
        data: sin_resolver,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Incidentes en la última semana</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default MetricasIncidentes;
