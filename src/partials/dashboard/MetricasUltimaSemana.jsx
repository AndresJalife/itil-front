import React from 'react';
import BarChart from '../../charts/BarChart01';
import BarChartLabels from  '../../charts/BarChartLabels';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


Date.prototype.subDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}


function MetricasUltimaSemana({
  incidentes,
  problemas,
  cambios
  }) {
  
  
  // Grafico ultima semana
  
  var today = new Date();
  var lastWeek = [
      today.subDays(6), today.subDays(5), today.subDays(4), today.subDays(3),
      today.subDays(2), today.subDays(1), today ];
      
  var newIncidents = lastWeek.map(
    day => incidentes.filter(
      i => ((new Date(i.created_on)).getDate() === day.getDate()) &&
           ((new Date(i.created_on)).getMonth() === day.getMonth())).length
  );
      
  var newProblems = lastWeek.map(
    day => problemas.filter(
      i => ((new Date(i.created_on)).getDate() === day.getDate()) &&
           ((new Date(i.created_on)).getMonth() === day.getMonth())).length
  );  
      
  var newChanges = lastWeek.map(
    day => cambios.filter(
      i => ((new Date(i.created_on)).getDate() === day.getDate()) &&
           ((new Date(i.created_on)).getMonth() === day.getMonth())).length
  );

  const chartDataUltimaSemana = {
    labels: lastWeek,
    datasets: [
      // Light blue bars
      {
        label: 'Nuevos Incidentes',
        data: newIncidents,
        backgroundColor: tailwindConfig().theme.colors.blue[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Nuevos Problemas',
        data: newProblems,
        backgroundColor: tailwindConfig().theme.colors.indigo[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Nuevos Cambios',
        data: newChanges,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };
  
  
  return (
    <div className="flex flex-col mb-6 col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Movimientos en la última semana</h2>
      </header>
      <BarChart data={chartDataUltimaSemana} width={595} height={248} />
 
    </div>    
  );
}

export default MetricasUltimaSemana;
