import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';

import $ from 'jquery'

import swal from 'sweetalert2';

import useUser from '../useUser';
import {Alert, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
  

/*{
    "name": "Problema prueba209",
    "created_by_id": "auth0|62a357a84b6448c8e4f8684c",
    "description": "Problema de prueba",
    "priority": "Baja"
    }*/
  

    

  function ModalCrearProblema({
    id,
    modalOpen,
    setModalOpen,
    updateDashboard
  }) {

    //const postProblem = 

    const [selectedPriority, setSelectedPriority] = useState("");

    const handlePriorityChange = (event) => {
      const { target: {value} } = event;
      setSelectedPriority(value);
    };

    const {user, isAdmin, isSupport} = useUser();
    
    const handleSubmit =  async (e) => {

      e.preventDefault()
      const form = new FormData(e.currentTarget);

      let url = "https://itil-back.herokuapp.com/problem"
      let data = JSON.stringify({"name": form.get("name"), 
      "description": form.get("description"), 
      created_by_id: user.sub,
      "priority": form.get("priority")})

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json; charset=utf-8"},
        body: data,
      })
      .then((response) => {
        if (response.ok){
          swal.fire({
            title: "El problema se creo exitosamente",
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
            <h2 className="font-semibold text-slate-800 ">Crear nuevo problema </h2></header>

            <form onSubmit={(e) => { handleSubmit(e)}}  className="border-b border-slate-200">


            {/* <input id={searchId} */}
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                <label  className="sr-only">Nombre</label>
                <input name="name" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Nombre…" />
                
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Descripcion</header>
                <label  className="sr-only">Descripcion</label>
                <input name="description" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Descripcion…"  />

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Prioridad</header>
                <label className="sr-only">Prioridad</label>
                <div className="px-5">
                <Select  id="prioridad" name="priority" fullWidth input={<OutlinedInput label="Prioridad" />} renderValue={selected => selected} value={selectedPriority} onChange={e => handlePriorityChange(e)} >
                    {["Alta", "Media", "Baja", ""].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                    </div>
                
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
    
    export default ModalCrearProblema;
    