import React, { useState, useEffect } from 'react';

import $ from 'jquery'; 

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardIncidentes from '../partials/dashboard/DashboardIncidentes';
import Banner from '../partials/Banner';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Alert, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';

import useUser from "../partials/useUser";
import LoadingData from '../partials/dashboard/LoadingData';



function NuevoCambio() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [problems, setProblems] = useState(null)
  const {user, isAdmin, isSupport} = useUser();

  const [selectedProblem, setSelectedProblem] = useState([]);
  const [selectedProblemId, setSelectedProblemId] = useState(0);
  const [selectedPriority, setSelectedPriority] = useState("Baja");
  const [selectedImpact, setSelectedImpact] = useState("Bajo");
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(problems);

    let new_change = {
      name: data.get('nombre'),
      description: data.get('descripcion'),
      problem_id: selectedProblemId,
      priority: data.get('prioridad'),
      impact: data.get('impacto'),
      created_by_id: user.sub
    };

    $.ajax({
      type: "POST",
      url: "https://itil-back.herokuapp.com/change",
      data: JSON.stringify(new_change),
      success: (data)=>{console.log(data)},
      error: (result) => {console.log(result)},
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    });
    
    console.log(new_change);
  };
  
  
  if (!problems) {
    $.get("https://itil-back.herokuapp.com/problem", function( data, status) {
      setProblems(data)
    })
  }

  const handleProblemChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedProblem(value.name);
    setSelectedProblemId(value.id);
  };
  const handlePriorityChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedPriority(value);
  };
  const handleImpactChange = (event) => {
    const {
      target: {value},
    } = event;
    setSelectedImpact(value);
  };
  
  
  let [sidebarSelected, setSidebarSelected] = useState("inicio")
  
  if (problems) {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} sidebarSelected="inicio" />

      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} nombreUsuario={"Nombre Usuario"} rolUsuario={"Administrador"}/>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <Typography component="h1" variant="h5">
            Nuevo Cambio
          </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoFocus
            />
            <FormControl fullWidth>
                  <InputLabel id="problem_id">Problema asociado</InputLabel>
                  <Select
                    labelId="problem_id"
                    id="problem_id"
                    name="problem_id"
                    fullWidth
                    input={<OutlinedInput label="Problema asociado" />}
                    renderValue={selected => selected}
                    value={selectedProblem}
                    onChange={e => handleProblemChange(e)}
                  >
                    {problems.map(c => <MenuItem key={c.id} value={c}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="descripcion"
              label="Descripcion"
              name="descripcion"
              autoFocus
            />  
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="prioridad">Prioridad</InputLabel>
                  <Select
                    labelId="prioridad"
                    id="prioridad"
                    name="prioridad"
                    fullWidth
                    input={<OutlinedInput label="Prioridad" />}
                    renderValue={selected => selected}
                    value={selectedPriority}
                    onChange={e => handlePriorityChange(e)}
                  >
                    {["Alta", "Media", "Baja"].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="impacto">Impacto</InputLabel>
                  <Select
                    labelId="impacto"
                    id="impacto"
                    name="impacto"
                    fullWidth
                    input={<OutlinedInput label="Impacto" />}
                    renderValue={selected => selected}
                    value={selectedImpact}
                    onChange={e => handleImpactChange(e)}
                  >
                    {["Alto", "Medio", "Bajo"].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Aceptar
            </Button>

          </Box>
        

          </div>
        </main>

      </div>
    </div>
  );
    } else {
    return (
      <LoadingData/>
    )
  }
}

export default NuevoCambio;
