import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import {Grid} from '@mui/material';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function MetricasConfig({
  info
  }) {


  // Grafico tipo de configuracion
  
  var types = {
    'Hardware': info.filter(item => item.config.versions[0].config_type === 'hardware').length,
    'Software': info.filter(item => item.config.versions[0].config_type === 'software').length,
    'SLA': info.filter(item => item.config.versions[0].config_type === 'SLA').length
  }
 
  console.log(info);
  const chartDataTipo = {
    labels: ['Hardware', 'Software', 'SLA'],
    datasets: [
      {
        label: 'Tipos',
        data: [ types['Hardware'], types['Software'], types['SLA'], ],
        backgroundColor: [
          tailwindConfig().theme.colors.blue[300],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.blue[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.blue[350],
          tailwindConfig().theme.colors.blue[600],
          tailwindConfig().theme.colors.blue[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };


  // Grafico cantidad de agregados en el tiempo  

  const dates = info.reduce((acumulado,actual) => {
    const date = new Date(actual.config.versions[0].created_on);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const string = day + '-' + month + '-' + year;
    if(!acumulado.includes(string)){
      acumulado.push(string);
    }
    return acumulado;
  },[])
  
  const acumItem = (type) => {
    var acum = dates.map(
      d => (info.filter(
        i => {
          const date = new Date(i.config.versions[0].created_on);
          const month = date.getMonth();
          const day = date.getDate();
          const year = date.getFullYear();
          const string = day + '-' + month + '-' + year;
          return string === d && i.config.versions[0].config_type === type;
        }).length)
    ); 
    return acum
  }

  const chartDataAgregados = {
    labels: dates,
    datasets: [
      // Light blue bars
      {
        label: 'Hardware',
        data: acumItem('hardware'),
        backgroundColor: tailwindConfig().theme.colors.blue[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Software',
        data: acumItem('software'),
        backgroundColor: tailwindConfig().theme.colors.indigo[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'SLA',
        data: acumItem('SLA'),
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };


  return (
    <div className="flex mt-10 mb-6 mx-1 ml-4 flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <Grid container spacing={2}>
        <Grid item className="mx-4" xs={12} sm={4} style={{ background: "white" }}>
          <header className="px-4 mx-auto py-4 border-b border-slate-100"  style={{width: "auto"}}>
            <h2 style={{textAlign: "center"}} className="font-semibold py-2 text-slate-800">Configuraciones</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Totales: {info.length}</h2>
          </header>
          <DoughnutChart data={chartDataTipo} width={300} height={200} />
        </Grid>
        
        <Grid item xs={12} sm={8} style={{ background: "white" }}>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 style={{textAlign: "center"}} className="font-semibold py-2 text-slate-800"> </h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Items de configuración agregados en el tiempo</h2>
          </header>
          <BarChart data={chartDataAgregados} unit_time={"month"} width={595} height={248} />
        </Grid>   
      </Grid> 
    </div>
  );
}

export default MetricasConfig;
