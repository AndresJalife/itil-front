import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';

import $, { data } from 'jquery'

import useUser from '../useUser';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';

import { userIDToName } from '../../utils/Utils';

  

function ModalInfoConfHardware({
    id,
    modalState,
    setModalState,
    itemID,
    updateDashboard
  }) {

  const [item, setItem] = useState(null);
  const {user, isAdmin, isSupport} = useUser();
  
  const closeModal = () => setModalState(prevState => ({
    ...prevState,
    ["open"]: false,
  }))

  const updateInfo = () => {
    setItem(null);
  }

  if (modalState.update) {
    $.get("https://itil-back.herokuapp.com/config/" + itemID, function( data, status) {
      setItem(data.config)
      setModalState(prevState => ({
        ...prevState,
        ["update"]: false
      }))
    });
  } 

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalState.open || keyCode !== 27) return;
      closeModal()
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalState.open //&& nameInput.current.focus();
  }, [modalState.open]);


  const versionado___ =  () => {
    $.ajax({
      type: "POST",
      url: "https://itil-back.herokuapp.com/config/" + itemID + "/solve",
      success: (data)=>{setModalOpen(false);},
      error: (result) => {console.log(result)},
      dataType: "json",
      contentType: "application/json; charset=utf-8"
    });
    updateDashboard();
    closeModal();
  }

  if (item) {
    console.log(modalState.open);
    return (
      <>
        {/* Modal backdrop */}
        <Transition
          className="fixed inset-0 bg-slate-900 bg-opacity-10 z-50 transition-opacity"
          show={modalState.open}
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
          className="fixed inset-0 z-50 overflow-hidden flex items-start top-5 mb-4 justify-center transform px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          show={modalState.open}
          enter="transition ease-in-out duration-200"
          enterStart="opacity-0 translate-y-4"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveStart="opacity-100 translate-y-0"
          leaveEnd="opacity-0 translate-y-4"
        >
        
          <div id="apareceonoaparece" className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
            {/* Search form */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200" style={{padding: '1%'}}>
              <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
              <h2 className="font-semibold text-slate-800 ">Informacion del item de configuracion</h2></header>

              <div className="border-b border-slate-200">

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].name}</div>

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Localizacion</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].location}</div>

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Proveedor</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].provider}</div>
                           
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Tipo</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].type}</div>
                   </Grid>
                  
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Numero de serie</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].serial_number}</div>
                  </Grid>
                 </Grid>

                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={4}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Precio</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">$ {item.versions[0].price}</div>
                   </Grid>
                  
                   <Grid item xs={12} sm={4}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Capacidad</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].capacity} GB</div>
                   </Grid>   
                  
                   <Grid item xs={12} sm={4}>
                     <h2 className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de instalacion</h2>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].installation_date}</div>
                   </Grid>
                 </Grid>    
                           
                 <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Version Actual</header>
                 <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.current_version}</div>
                                                  
                       
                 <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2"> </header>
                 <div className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"space-around", paddingBottom: "10px", paddingTop: "10px"}}>
                   <Button variant="text" onClick={closeModal}>Salir</Button>
                 </div>
              </div>
            </div>
          </div>
        </Transition>
      </>
    );
    } else {
      console.log("no se dibuja");
      {
        return (
          <>
          {/* Modal backdrop */}
    
          <Transition
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          show={modalState.open}
          enter="transition ease-out duration-200"
          enterStart="opacity-0"
          enterEnd="opacity-0"
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
          show={modalState.open}
          enter="transition ease-in-out duration-200"
          enterStart="opacity-0 translate-y-4"
          enterEnd="opacity-0 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveStart="opacity-100 translate-y-0"
          leaveEnd="opacity-0 translate-y-4"
        >
          <div >
          </div>
            </Transition>
          </>
        )
      }
    }
}
    
export default ModalInfoConfHardware;
    
