import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import ItemVersions from './ItemVersions';
import useUser from '../useUser';
import {Alert, Button, InputLabel, MenuItem, OutlinedInput, Grid} from '@mui/material';
import { userIDToName } from '../../utils/Utils';
import useCollapse from 'react-collapsed';

import $, { data } from 'jquery'

function ModalInfoConfSLA({
    id,
    modalState,
    setModalState,
    itemID,
    updateDashboard
  }) {

  const [item, setItem] = useState(null);
  const {user, isAdmin, isSupport} = useUser();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({duration: 200});

  const closeModal = () => setModalState(prevState => ({
    ...prevState,
    ["open"]: false,
  }))

  const updateInfo = () => {
    setModalState(prevState => ({
    ...prevState,
    ["update"]: true,
  }))
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

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Servicio</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].service}</div>

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Gerente del servicio</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].service_manager}</div>
                          
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de inicio</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].start_date}</div>
                   </Grid>
                  
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de finalizacion</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].end_date}</div>
                  </Grid>
                 </Grid>
                          
                 <Grid container spacing={2}>
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Crucial</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.versions[0].crucial ? "Si" : "No"}</div>
                   </Grid>
                  
                   <Grid item xs={12} sm={6}>
                     <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Version</header>
                     <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.current_version}</div>
                  </Grid>
                 </Grid>
  
                  <div className="collapsible">
                    <div className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2" {...getToggleProps()}>
                        {isExpanded ? 'Versiones anteriores  ▽' : 'Versiones anteriores  ▼'} </div>
                    <div {...getCollapseProps()}> <ItemVersions itemID={itemID} updateDashboard={updateInfo} /> </div>
                 </div>
                   
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
    
export default ModalInfoConfSLA;
    
