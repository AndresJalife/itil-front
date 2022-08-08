import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import "./Datetime.css"

import $ from 'jquery'

import swal from 'sweetalert2';

import useUser from '../useUser';
import {Alert, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
  

function ModalCrearConfSLA({
    id,
    modalOpen,
    setModalOpen,
    updateDashboard,
    oldVersionItem,
    item
  }) {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCrucial, setSelectedCrucial] = useState("");
  const [url, setUrl] = useState(oldVersionItem? "https://itil-back.herokuapp.com/config/" + item.config_id : "https://itil-back.herokuapp.com/config"); 
  const [msg, setMsg] = useState(oldVersionItem? "Se agregó una nueva version" : "El item de configuración se creo exitosamente"); 
  const {user, isAdmin, isSupport} = useUser();

  const handleSubmit =  async (e) => {

    e.preventDefault()
    const form = new FormData(e.currentTarget);

    let new_config = {
      "config_type": "SLA",
      "name": form.get('name'),
      "service": form.get('service'),
      "service_manager": form.get('service_manager'),
      "start_date": startDate,
      "end_date": endDate,
      "crucial": selectedCrucial === "Si",
      "user_id": user.sub
    };

    console.log(JSON.stringify(new_config))
    let data = JSON.stringify(new_config)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json; charset=utf-8"},
      body: data,
    })
    .then((response) => {
      if (response.ok){
        swal.fire({
          title: msg,
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

  const handleCrucialChange = (event) => {
    const { target: {value} } = event;
    setSelectedCrucial(value);
  };
    
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
          <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">

          <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
          <h2 className="font-semibold text-slate-800 ">{oldVersionItem? "Nueva version" : "Crear item de configuración de SLA"} </h2></header>

          <form onSubmit={(e) => { handleSubmit(e)}}  className="border-b border-slate-200">


          {/* <input id={searchId} */}
              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
              <label  className="sr-only">Nombre</label>
              <input name="name" defaultValue={oldVersionItem? item.name: ''} placeholder="Nombre..."  className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text"/>
              
              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Servicio</header>
              <label  className="sr-only">Servicio</label>
              <input name="service" defaultValue={oldVersionItem? item.service: ''} placeholder="Servicio..."  className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" />

              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Gerente del servicio</header>
              <label  className="sr-only">Gerente del servicio</label>
              <input name="service_manager" defaultValue={oldVersionItem? item.service_manager: ''} placeholder="Gerente..."  className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" />
                       
              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Crucial</header>
              <label htmlFor="crucial" className="sr-only">Crucial</label>
              <Select id="crucial" defaultValue={oldVersionItem? "Si" : ''} name="crucial" fullWidth input={<OutlinedInput label="Crucial" />} renderValue={selected => selected} value={selectedCrucial} onChange={e => handleCrucialChange(e)} >
              {["Si", "No", ""].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
                       
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de inicio</header>
                    <label  className="sr-only">Fecha de inicio</label>
                    <Datetime inputProps={{className:'datetime'}} dateFormat="DD-MM-YYYY" timeFormat={false} value={startDate} onChange={(e) => setStartDate(e)} closeOnSelect='true' className="text-xs uppercase"/>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de finalizacion</header>
                    <label  className="sr-only">Fecha de finalizacion</label>
                    <Datetime inputProps={{className:'datetime'}} dateFormat="DD-MM-YYYY" timeFormat={false} value={endDate} onChange={(e) => setEndDate(e)} closeOnSelect='true' className="text-xs uppercase"/>
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
}
  
export default ModalCrearConfSLA;
  
