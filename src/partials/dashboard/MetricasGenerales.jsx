import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import {Grid} from '@mui/material';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function MetricasGenerales({
  incidentes,
  problemas,
  cambios
  }) {

  var incidentes_info = {
    'creados': incidentes.filter(item => item.status === 'CREADO').length,
    'tomados': incidentes.filter(item => item.status === 'TOMADO').length,
    'resueltos': incidentes.filter(item => item.status === 'RESUELTO').length
  }
  
  var problemas_info = {
    'creados': problemas.filter(item => item.status === 'CREADO').length,
    'tomados': problemas.filter(item => item.status === 'TOMADO').length,
    'resueltos': problemas.filter(item => item.status === 'RESUELTO').length
  }
  
  var cambios_info = {
    'creados': cambios.filter(item => item.status === 'CREADO').length,
    'tomados': cambios.filter(item => item.status === 'TOMADO').length,
    'resueltos': cambios.filter(item => item.status === 'RESUELTO').length
  }
  
  const chartDataIncidentes = {
    labels: ['Creados', 'Tomados', 'Resueltos'],
    datasets: [
      {
        label: 'Incidentes',
        data: [
          incidentes_info['creados'], incidentes_info['tomados'], incidentes_info['resueltos'],
        ],
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
  const chartDataProblemas = {
    labels: ['Creados', 'Tomados', 'Resueltos'],
    datasets: [
      {
        label: 'Incidentes',
        data: [
          problemas_info['creados'], problemas_info['tomados'], problemas_info['resueltos'],
        ],
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
  
  const chartDataCambios = {
    labels: ['Creados', 'Tomados', 'Resueltos'],
    datasets: [
      {
        label: 'Incidentes',
        data: [
          cambios_info['creados'], cambios_info['tomados'], cambios_info['resueltos'],
        ],
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

  return (
    <div className="flex mt-10 mb-6 mx-1 ml-4 flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <Grid container spacing={2}>
        <Grid item className="mx-4" xs={12} sm={4} style={{ background: "white" }}>
          <header className="px-4 mx-auto py-4 border-b border-slate-100"  style={{width: "auto"}}>
            <h2 style={{textAlign: "center"}} className="font-semibold py-2 text-slate-800">Incidentes</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Totales: {incidentes.length}</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Sin Resolver: {incidentes.filter(i => i.status != 'RESUELTO').length}</h2>
          </header>
          <DoughnutChart data={chartDataIncidentes} width={300} height={200} />
        </Grid>
        
        <Grid item xs={12} sm={4} style={{ background: "white" }}>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 style={{textAlign: "center"}} className="font-semibold py-2 text-slate-800">Problemas</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Totales: {problemas.length}</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Sin Resolver: {problemas.filter(i => i.status != 'RESUELTO').length}</h2>
          </header>
          <DoughnutChart data={chartDataProblemas} width={300} height={200} />
        </Grid>   
        
        <Grid item xs={12} sm={4} style={{ background: "white"}}>
          <header className="px-5 py-4 border-b border-slate-100">
            <h2 style={{textAlign: "center"}} className="font-semibold py-2 text-slate-800">Cambios</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Totales: {cambios.length}</h2>
            <h2 style={{textAlign: "center"}} className="font-semibold text-slate-800">Sin Resolver: {cambios.filter(i => i.status != 'RESUELTO').length}</h2>
          </header>
          <DoughnutChart data={chartDataCambios} width={300} height={200} />
        </Grid>
      </Grid> 
    </div>
  );
}

export default MetricasGenerales;
