import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';

import $ from 'jquery'

import swal from 'sweetalert2';

import useUser from '../useUser';
import {Alert, Chip, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
  

function ModalCrearIncidente({
    id,
    modalOpen,
    setModalOpen,
    updateDashboard
  }) {

    let sin_seleccion = { id:0, name:'' }; 

    let sin_seleccion_config = { config:{id:0, versions:[{name:''}]} }; 


    const [problems, setProblems] = useState(null);
    const [configs, setConfigs] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedProblem, setSelectedProblem] = useState(sin_seleccion);
    const [selectedConfig, setSelectedConfig] = useState(sin_seleccion_config);

    const [asociatedConfigs, setAsociatedConfigs] = useState([]);

    const [selectedImpact, setSelectedImpact] = useState("");

    const {user, isAdmin, isSupport} = useUser();
    
    const handleSubmit =  async (e) => {

      e.preventDefault()
      const form = new FormData(e.currentTarget);

      console.log(asociatedConfigs)
      let new_incident = {
        name: form.get('name'),
        description: form.get('description'),
        priority: form.get('priority'),
        impact: form.get('impact'),
        created_by_id: user.sub,
        configuration_ids: (asociatedConfigs ? asociatedConfigs.map((c, i) => c.config.id) : null)
      };
      if (selectedProblem.id != 0){
        new_incident["problem_id"]=selectedProblem.id;
      }

      console.log(new_incident)

      console.log(JSON.stringify(new_incident))


      let url = "https://itil-back.herokuapp.com/incident"
      let data = JSON.stringify(new_incident)

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json; charset=utf-8"},
        body: data,
      })
      .then((response) => {
        if (response.ok){
          swal.fire({
            title: "El incidente se creo exitosamente",
            icon: "success"});
          updateDashboard();
        } else {
          console.log(response)
          swal.fire({
            title: "Ocurrió un error: ",
            text: response.statusText,
            icon: "error"});
        }})
      .catch((error) => {console.log(error); swal.fire({
        title: "Ocurrió un error: ",
        text: error.message,
        icon: "error"});});
      
      setModalOpen(false);
        
    }

    if (!configs) {
      $.get("https://itil-back.herokuapp.com/config", function( data, status) {
        setConfigs([...data, sin_seleccion_config])
      })
    } 

    if (!problems) {
      $.get("https://itil-back.herokuapp.com/problem", function( data, status) {
        setProblems([...data, sin_seleccion])
      })
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
      modalOpen //&& nameInput.current.focus();
    }, [modalOpen]);

    const handlePriorityChange = (event) => {
      const { target: {value} } = event;
      setSelectedPriority(value);
    };

    const handleImpactChange = (event) => {
      const { target: {value} } = event;
      setSelectedImpact(value);
    };

    const handleProblemChange = (event) => {
      const { target: {value} } = event;
      setSelectedProblem(value);
    };

    const handleConfigChange = (event) => {
      const { target: {value} } = event;
      console.log(value);
      setSelectedConfig(value);
      setAsociatedConfigs((prev)=> {return [...prev, value]} )

    };
    
    if (problems && configs) {
      console.log(configs)
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
              <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200" style={{padding: '1%', textAlign:"left"}}>

              <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
              <h2 className="font-semibold text-slate-800 ">Crear nuevo incidente</h2></header>

              <form onSubmit={(e) => { handleSubmit(e)}}  className="border-b border-slate-200">


                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                  <label  className="sr-only">Nombre</label>
                  <input name="name" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Nombre…" />
                  
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Descripcion</header>
                  <label  className="sr-only">Descripcion</label>
                  <input name="description" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Descripcion…"  />

                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Problema Asociado</header>
                  <label  className="sr-only">Problema Asociado</label>
                  <Select id="problem_id" name="problem_id" fullWidth input={<OutlinedInput label="Problema asociado" />} renderValue={selected => selected} value={selectedProblem.name} onChange={e => handleProblemChange(e)} >
                    {problems.map((c, i) => <MenuItem key={i} value={c}>{c.name}</MenuItem>)}
                  </Select>

                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Asociar configuración</header>
                  <label  className="sr-only">Asociar configuración</label>
                  <Select id="config_id" fullWidth input={<OutlinedInput label="Asociar configuración" />} renderValue={selected => selected} value={selectedConfig.config.versions.at(-1).name} onChange={e => handleConfigChange(e)} >
                    {configs.filter(c => !asociatedConfigs.includes(c)).map((c, i) => <MenuItem key={i} value={c}>{c.config.versions.at(-1).name}</MenuItem>)}

                  </Select>
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Elementos de configuración asociados:</header>
                  <span className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-3 pr-4"> {
                                asociatedConfigs.map((c,i) => <Chip  key={i} label={c.config.versions.at(-1).name}  onDelete={() => setAsociatedConfigs((prev) => prev.filter(x => x.config.id != c.config.id))} /> )} 
                                </span>

                  

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
                  <div type="submit" className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"space-around", paddingBottom: "10px", paddingTop: "10px"}}>
                    <Button variant="text" onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <CustomButton  type="submit">Crear</CustomButton>
                  </div>
                

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
    
    export default ModalCrearIncidente;
    