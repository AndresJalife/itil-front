import React, { useState, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';

import $ from 'jquery'

import useUser from '../useUser';
import LoadingData from './LoadingData';
    

function ModalCrearCambio({
    id,
    modalOpen,
    setModalOpen
  }) {

  let sin_seleccion = { id:0, name:'' };

  const {user, isAdmin, isSupport} = useUser();
  const [problems, setProblems] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(sin_seleccion);
  const [selectedProblem, setSelectedProblem] = useState(sin_seleccion);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");

  const handleSubmit =  async (e) => {

    e.preventDefault()

    const form = new FormData(e.currentTarget);

    let new_change = {
      name: form.get('name'),
      description: form.get('description'),
      problem_id: selectedProblem.id,
      incident_id: selectedIncident.id,
      priority: form.get('priority'),
      impact: form.get('impact'),
      created_by_id: user.sub
    };
  
    $.ajax({
      type: "POST",
      url: "https://itil-back.herokuapp.com/change",
      data: JSON.stringify(new_change),
      success: (data)=>{setModalOpen(false);},
      error: (result) => {console.log(result)},
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    });
    
    //setModalOpen(false);
  }

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen
  }, [modalOpen]);
  
  const cancelChange = () => {
    setModalOpen(false);
  }  
  
  if (!problems) {
    $.get("https://itil-back.herokuapp.com/problem", function( data, status) {
      setProblems([...data, sin_seleccion])
    })
  } 
   
  if (!incidents) {
    $.get("https://itil-back.herokuapp.com/incident", function( data, status) {
      setIncidents([...data, sin_seleccion])
    })
  }

  const handleIncidentChange = (event) => {
    const { target: {value} } = event;
    setSelectedIncident(value);
  };
  const handleProblemChange = (event) => {
    const { target: {value} } = event;
    setSelectedProblem(value);
  };
  const handlePriorityChange = (event) => {
    const { target: {value} } = event;
    setSelectedPriority(value);
  };
  const handleImpactChange = (event) => {
    const { target: {value} } = event;
    setSelectedImpact(value);
  };
  
  if (problems && incidents) {
    return (
      <>
        {/* Modal backdrop */}
        <Transition
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          show={modalOpen}
          enter="transition ease-out duration-200"
          enterStart="opacity-0"
          enterEnd="opacity-100"
          leave="transition ease-out duration-100"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
          aria-hidden="true"
        />
        {/* Modal dialog */}
        <Transition
          id={id}
          className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          show={modalOpen}
          enter="transition ease-in-out duration-200"
          enterStart="opacity-0 translate-y-4"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveStart="opacity-100 translate-y-0"
          leaveEnd="opacity-0 translate-y-4"
        >
          <div className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
            {/* Search form */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200" style={{padding: '1%'}}>

            <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
            <h2 className="font-semibold text-slate-800 ">Crear nuevo cambio </h2></header>

            <form onSubmit={(e) => { handleSubmit(e);}}  className="border-b border-slate-200">


                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                <label  className="sr-only">Nombre</label>
                <input name="name" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Nombre…" />
                
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Descripcion</header>
                <label  className="sr-only">Descripcion</label>
                <input name="description" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Descripcion…" />
             
                <FormControl fullWidth>
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Incidente Asociado</header>
                  <label  className="sr-only">Incidente Asociado</label>
                  <Select id="incident_id" name="incident_id" fullWidth input={<OutlinedInput label="Incidente asociado" />} renderValue={selected => selected} value={selectedIncident.name} onChange={e => handleIncidentChange(e)} >
                    {incidents.map((c, i) => <MenuItem key={i} value={c}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                             
                <FormControl fullWidth>
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Problema Asociado</header>
                  <label  className="sr-only">Problema Asociado</label>
                  <Select id="problem_id" name="problem_id" fullWidth input={<OutlinedInput label="Problema asociado" />} renderValue={selected => selected} value={selectedProblem.name} onChange={e => handleProblemChange(e)} >
                    {problems.map((c, i) => <MenuItem key={i} value={c}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Prioridad</header>
                    <label htmlFor="prioridad" className="sr-only">Prioridad</label>
                    <Select id="prioridad" name="priority" fullWidth input={<OutlinedInput label="Prioridad" />} renderValue={selected => selected} value={selectedPriority} onChange={e => handlePriorityChange(e)} >
                    {["Alta", "Media", "Baja", ""].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Impacto</header>
                    <label className="sr-only">Impacto</label>
                    <Select id="impacto" name="impact" fullWidth input={<OutlinedInput label="Impacto" />} renderValue={selected => selected} value={selectedImpact} onChange={e => handleImpactChange(e)} >
                    {["Alto", "Medio", "Bajo", ""].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </Grid>
                </Grid>
                
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2"> </header>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <div type="button" onClick={cancelChange} className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"center", paddingBottom: "10px", paddingTop: "10px"}}>
                      <Button type="button" onClick={cancelChange} >Cancelar</Button>
                    </div>                 
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div type="submit" className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"center", paddingBottom: "10px", paddingTop: "10px"}}>
                      <CustomButton type="submit">Crear</CustomButton>
                    </div>
                  </Grid>
                </Grid>
                
            </form>
            </div>
          </div>
        </Transition>
      </>
    );
    } else {
    return (
      <></>
    )
  }
}
    
    export default ModalCrearCambio;
    
