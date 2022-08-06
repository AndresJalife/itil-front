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


function MetricasIndividuales({
  info,
  nombre
  }) {
  
  
  // Grafico promedio por semana
  
  var today = new Date();
  const msInWeek = 1000 * 60 * 60 * 24 * 7; 
  const firstDay = new Date('07/15/2022');
  var numberOfWeeks = Math.round(Math.abs(today - firstDay) / msInWeek);

  var weekAvg = [0, 1, 2, 3, 4, 5, 6].map(
    day => Math.ceil(info.filter(
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
  
  if (nombre === "Incidentes"){
    var impact = ["Bajo", "Medio", "Alto"].map(
      imp => [info.filter(i => ((i.impact === imp) && (i.priority === "Baja"))).length,
              info.filter(i => ((i.impact === imp) && (i.priority === "Media"))).length,
              info.filter(i => ((i.impact === imp) && (i.priority === "Alta"))).length]
    );
    
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
      ],
      type: "heatmap"
    };
    
  } else {
    var priorityInfo = priority.map(
      p => info.filter(i => (i.priority === p)).length
    );    
    var chartDataPrioridadImpacto = {
      options: {
        chart: { id: "basic-bar", toolbar: { show: false } },
        xaxis: { categories: priority, title: { text: "prioridad" } },
        colors: ["#008FFB"],
      },
      series: [{
        data: [
        { x: "Baja", y: priorityInfo[0] },
        { x: "Media", y: priorityInfo[1] },
        { x: "Alta", y: priorityInfo[2] }
        ]
      }],
      type: "bar"
    };
    console.log(priorityInfo);
  }


  // Grafico por semana por hora
  
  const empty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  const hs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  var infoXsemanaXhora = info.reduce((acumulado, actual) => {
    const date = new Date(actual.created_on);
    const day = date.getDay();
    const hour = date.getHours();
    if (!acumulado[day]) {
      acumulado[day] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    acumulado[day][hour] = acumulado[day][hour] + 1;
    return acumulado;
  }, {});
  
  var chartDataHoras = {
    options: {
      chart: { id: "basic-bar", toolbar: { show: false } },
      xaxis: { categories: hs, title: { text: "Hora" } },
      yaxis: { type: "category" },
      colors: ["#008FFB"],
    },
    series: [
      { name: "Domingo", data: infoXsemanaXhora[0] ? infoXsemanaXhora[0] : empty},
      { name: "Lunes", data: infoXsemanaXhora[1] ? infoXsemanaXhora[1] : empty },
      { name: "Martes", data: infoXsemanaXhora[2] ? infoXsemanaXhora[2] : empty },
      { name: "Miercoles", data: infoXsemanaXhora[3] ? infoXsemanaXhora[3] : empty },
      { name: "Jueves", data: infoXsemanaXhora[4] ? infoXsemanaXhora[4] : empty },
      { name: "Viernes", data: infoXsemanaXhora[5] ? infoXsemanaXhora[5] : empty },
      { name: "Sabado", data: infoXsemanaXhora[6] ? infoXsemanaXhora[6] : empty }
    ]
  };

  return (
    <div className="mb-6 flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{nombre} promedio por semana</h2>
      </header>
      <BarChartLabels data={chartDataPromedioSemana} width={595} height={248} />
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} >
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">{nombre} por prioridad e impacto</h2>
          </header>      
          <Chart options={chartDataPrioridadImpacto.options} series={chartDataPrioridadImpacto.series} type={chartDataPrioridadImpacto.type} width="100%" height="248"/>     
        </Grid>
        
        <Grid item xs={12} sm={7} >
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">{nombre} por semana y hora</h2>
          </header>      
          <Chart options={chartDataHoras.options} series={chartDataHoras.series} type="heatmap" width="100%" height="248"/>
        </Grid>
      </Grid>  
      
    </div>    
  );
}

export default MetricasIndividuales;
