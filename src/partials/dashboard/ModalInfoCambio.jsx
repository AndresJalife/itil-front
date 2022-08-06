import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';
import MessageButton from './MessageButton';

import $, { data } from 'jquery'

import useUser from '../useUser';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid, IconButton} from '@mui/material';
  
import { userIDToName, simplifyDate, getOnlyDate, permisosByUserID } from '../../utils/Utils';
import ModalInfoConfSoftware from './ModalInfoConfSoftware';
import ModalInfoConfHardware from './ModalInfoConfHardware';
import ModalInfoConfSLA from './ModalInfoConfSLA';
import { DataSaverOn } from '@mui/icons-material';

function ModalInfoCambio({
    id,
    modalState,
    setModalState,
    changeId,
    updateDashboard
  }) {

    const [change, setChange] = useState(null);

    const [comments, setComments] = useState(null);

    const [message, setMessage] = useState('');

    const {user, isAdmin, isSupport} = useUser();
    
    const closeModal = () => setModalState(prevState => ({
      ...prevState,
      ["open"]: false,
    }))

    const updateModal = () => setModalState(prevState => ({
      ...prevState,
      ["update"]: true,
    }))

    const updateMessages = () => {
      $.get("https://itil-back.herokuapp.com/change/" + changeId + "/comment", function( data, status) {
        setComments(data)
      })
    }

    if (modalState.update) {
      $.get("https://itil-back.herokuapp.com/change/" + changeId, function( data, status) {
        setChange(data)
        setModalState(prevState => ({
          ...prevState,
          ["update"]: false
        }))
      })
      updateMessages();
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

    const takeChange =  () => {
      let change_data = {
        taken_by_id: user.sub
      };
      
      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/change/" + changeId + "/take",
        data: JSON.stringify(change_data),
        success: (data)=>{updateDashboard();setModalOpen(false);},
        error: (result) => {updateDashboard();setModalOpen(false);console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      
      closeModal();
    }

    const solveChange =  () => {
      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/change/" + changeId + "/solve",
        success: (data)=>{updateDashboard();setModalOpen(false);},
        error: (result) => {updateDashboard();setModalOpen(false);console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      closeModal();
    }

    const postMessage =  async (e) => {

      e.preventDefault()

      let url = "https://itil-back.herokuapp.com/change/" + changeId + "/comment"
      let data = JSON.stringify({"comment": message,  
      "user_id": user.sub})

      console.log(data)
    
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json; charset=utf-8"},
        body: data,
      })
      .then((response) => {
        if (response.ok){
          updateMessages();
        } else {
          console.log(response)
        }})
      .catch((error) => {console.log(error)});
      
      setMessage('');
        
    }


    const [itemId, setItemId] = useState(null)
    const [infoModalSoftState, setInfoModalSoftState] = useState({"open": false, "update": false})
    const [infoModalHardState, setInfoModalHardState] = useState({"open": false, "update": false})
    const [infoModalSlaState, setInfoModalSlaState] = useState({"open": false, "update": false})

  

    console.log(change)
    if (change && comments) {
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
            <div id="apareceonoaparece" className="bg-white overflow-auto max-w-4xl w-full max-h-full rounded shadow-lg">
              {/* Search form */}

              <Grid container>
                <Grid item xs={12} sm={7}>
                  <div className="col-span-full xl:col-span-6 bg-white rounded-sm" style={{padding: '1%'}}>
                    <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
                    <h2 className="font-semibold text-slate-800 ">Informacion del cambio</h2></header>

                  <div className="border-slate-200">
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>                  
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                  <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.name}</div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de creacion</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{getOnlyDate(change.created_on)}</div>
                  </Grid>

                  </Grid>
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Descripcion</header>
                  <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.description}</div>



                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Problema Asociado</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.problem_id}</div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Incidente Asociado</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.incident_id}</div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Creado Por</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{userIDToName(change.created_by_id)}</div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <header style={{display:'flex', justifyContent:'space-between'}}>
                        <h2 className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Tomado Por</h2>
                        <Button disabled={(permisosByUserID(user.sub).tomaroresolver == false ) || change.status != 'creado'}onClick={(e) => { e.stopPropagation(); takeChange();}}>Tomar </Button>  
                      </header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{userIDToName(change.taken_by_id)}</div>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Prioridad</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.priority}</div>           
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <header style={{display:'flex', justifyContent:'space-between'}}>
                        <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Estado</header>
                        <Button disabled={(permisosByUserID(user.sub).tomaroresolver == false )  || change.status != 'tomado' || user.sub != change.taken_by_id}onClick={(e) => { e.stopPropagation(); solveChange()}}>Resolver</Button>  
                      </header>
                        <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{change.status}</div>         
                    </Grid>
                  </Grid>

                  {change.incident && (change.incident.configurations.length>0) ? <div className="overflow-x-auto">
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Elementos de configuración relacionados</header>

                     <table className="table-auto w-full">
                  
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">ID</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-left">Nombre</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-center">Detalle / Acciones</div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                          {
                          
                          change.incident.configurations.map(c => {
                              return (
                              <tr key={c.id}>
                                  <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{c.id}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">           
                                  <div className="font-medium text-slate-800">{c.versions.filter((x)=> x.version_number == c.current_version)[0].name}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">           
                                    <div className="font-medium text-center text-slate-800"><IconButton onClick={(e) => { 
                                                                                                                  e.stopPropagation(); setItemId(c.id); 
                                                                                                                  console.log(c);
                                                                                                                  switch (c.versions[0].config_type){
                                                                                                                    case 'software':
                                                                                                                      setInfoModalSoftState({"open": true, "update": true});
                                                                                                                    break;
                                                                                                                    case 'hardware':
                                                                                                                      setInfoModalHardState({"open": true, "update": true});
                                                                                                                    break;
                                                                                                                    case 'sla':
                                                                                                                      setInfoModalSlaState({"open": true, "update": true});
                                                                                                                    break;
                                                                                                                  }}}><DataSaverOn variant="text" /></IconButton></div>
                                  </td>
                              </tr>
                              )
                          })
                          }
                      </tbody>
                    </table>
                  </div>: <h className="p-2 whitespace-nowrap"><div className="text-center">No hay elementos de config relacionados</div></h>}
                  
                  </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <div className="col-span-full xl:col-span-6 bg-white rounded-sm" style={{padding: '1%'}}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Comentarios</header>
                    <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-5 pr-4 overflow-y-scroll" style={{height: '380px'}}>
                      {comments.map(c => 
                        <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-1">
                          <div style={{fontSize: '13px'}}>{userIDToName(c.user_id)}<a style={{marginLeft: '100px', fontSize: '13px'}}>{simplifyDate(c.created_on)}</a></div>
                          <div className="message" style={{padding: '2%'}}>{c.comment}</div>
                        </div>)}
                    </div>
                    <form onSubmit={(e) => { postMessage(e)}} className="message">
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={10}>
                        <input name="message" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-1" type="text" placeholder="Escriba su mensaje…" onChange={event => setMessage(event.target.value)} value={message} autoComplete='off'/>
                      </Grid>
                        
                      <Grid item xs={12} sm={2}>
                        <MessageButton type='submit' className='py-1'/>
                      </Grid>
                    </Grid> 
                    </form>
                  </div>
                </Grid>
              </Grid>
              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2"> </header>
                <div className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"space-around", paddingBottom: "10px", paddingTop: "10px"}}>
                  <Button variant="text" onClick={closeModal}>Salir</Button>
                </div>
            </div>

        <ModalInfoConfHardware id="info-hardware-modal" enableVersionChange={(permisosByUserID(user.sub).tomaroresolver)  && change.status == 'tomado' && user.sub == change.taken_by_id}  modalState={infoModalHardState} setModalState={setInfoModalHardState} itemID={itemId} updateDashboard={updateModal}/>
        <ModalInfoConfSoftware id="info-hardware-modal" enableVersionChange={(permisosByUserID(user.sub).tomaroresolver )  && change.status == 'tomado' && user.sub == change.taken_by_id}  modalState={infoModalSoftState} setModalState={setInfoModalSoftState} itemID={itemId} updateDashboard={updateModal}/>
        <ModalInfoConfSLA id="info-hardware-modal" enableVersionChange={(permisosByUserID(user.sub).tomaroresolver )  && change.status == 'tomado' && user.sub == change.taken_by_id}  modalState={infoModalSlaState} setModalState={setInfoModalSlaState} itemID={itemId} updateDashboard={updateModal}/>
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
    
    export default ModalInfoCambio;
    
