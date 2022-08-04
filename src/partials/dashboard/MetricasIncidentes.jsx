import React from 'react';
import BarChart from '../../charts/BarChart01';
import BarChartLabels from  '../../charts/BarChartLabels';
import Chart from "react-apexcharts";
import {Grid} from '@mui/material';

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
  
  
  // Grafico promedio por semana
  
  var today = new Date();
  const msInWeek = 1000 * 60 * 60 * 24 * 7; 
  const firstDay = new Date('07/15/2022');
  var numberOfWeeks = Math.round(Math.abs(today - firstDay) / msInWeek);

  var weekAvg = [0, 1, 2, 3, 4, 5, 6].map(
    day => Math.ceil(incidentes.filter(
      i => ((new Date(i.created_on)).getDay() === day)).length / numberOfWeeks)
  );
  console.log(weekAvg);
  
  const chartDataPromedioSemana = {
    labels: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
    datasets: [
      // Light blue bars
      {
        label: 'Totales',
        data: weekAvg,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      }
    ],
  };


  // Grafico prioridad impacto
  
  const priority = ["Baja", "Media", "Alta"];
  var impact = ["Bajo", "Medio", "Alto"].map(
    imp => [incidentes.filter(i => ((i.impact === imp) && (i.priority === "Baja"))).length,
            incidentes.filter(i => ((i.impact === imp) && (i.priority === "Media"))).length,
            incidentes.filter(i => ((i.impact === imp) && (i.priority === "Alta"))).length]
  );
  console.log(impact);
  
  var chartDataPrioridadImpacto = {
    options: {
      chart: { id: "basic-bar", toolbar: { show: false } },
      xaxis: { categories: priority, title: { text: "prioridad" } },
      yaxis: { title: { text: "impacto" } },
      colors: ["#008FFB"],
    },
    series: [
      { name: "Bajo", data: impact[0] },
      { name: "Medio", data: impact[1] },
      { name: "Alto", data: impact[2] }
    ]
  };


  // Grafico por semana por hora
  
  const empty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  const hs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  var incidentesXsemanaXhora = incidentes.reduce((acumulado, actual) => {
    const date = new Date(actual.created_on);
    const day = date.getDay();
    const hour = date.getHours();
    if (!acumulado[day]) {
      acumulado[day] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    acumulado[day][hour] = acumulado[day][hour] + 1;
    return acumulado;
  }, {});
  console.log(incidentesXsemanaXhora);
  
  var chartDataHoras = {
    options: {
      chart: { id: "basic-bar", toolbar: { show: false } },
      xaxis: { categories: hs, title: { text: "Hora" } },
      yaxis: { type: "category" },
      colors: ["#008FFB"],
    },
    series: [
      { name: "Domingo", data: incidentesXsemanaXhora[0] ? incidentesXsemanaXhora[0] : empty},
      { name: "Lunes", data: incidentesXsemanaXhora[1] ? incidentesXsemanaXhora[1] : empty },
      { name: "Martes", data: incidentesXsemanaXhora[2] ? incidentesXsemanaXhora[2] : empty },
      { name: "Miercoles", data: incidentesXsemanaXhora[3] ? incidentesXsemanaXhora[3] : empty },
      { name: "Jueves", data: incidentesXsemanaXhora[4] ? incidentesXsemanaXhora[4] : empty },
      { name: "Viernes", data: incidentesXsemanaXhora[5] ? incidentesXsemanaXhora[5] : empty },
      { name: "Sabado", data: incidentesXsemanaXhora[6] ? incidentesXsemanaXhora[6] : empty }
    ]
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Promedio de incidentes por semana</h2>
      </header>
      <BarChartLabels data={chartDataPromedioSemana} width={595} height={248} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} >
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Incidentes por prioridad e impacto</h2>
          </header>      
          <Chart options={chartDataPrioridadImpacto.options} series={chartDataPrioridadImpacto.series} type="heatmap" width="100%" height="248"/>     
        </Grid>
        
        <Grid item xs={12} sm={7} >
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Incidentes por semana y hora</h2>
          </header>      
          <Chart options={chartDataHoras.options} series={chartDataHoras.series} type="heatmap" width="100%" height="248"/>
        </Grid>
      </Grid>  
      
    </div>    
  );
}

export default MetricasIncidentes;
