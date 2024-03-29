import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';
import "./Message.css"
import MessageButton from './MessageButton';
import { getOnlyDate } from '../../utils/Utils';


import $, { data } from 'jquery'

import useUser from '../useUser';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
  
import { userIDToName, simplifyDate } from '../../utils/Utils';


function ModalInfoProblema({
    id,
    modalState,
    setModalState,
    problemId,
    updateDashboard
  }) {

    const [problem, setProblem] = useState(null);

    const [incidents, setIncidents] = useState(null);


    const [comments, setComments] = useState(null);

    const [message, setMessage] = useState('');

    const {user, isAdmin, isSupport} = useUser();
    
    const closeModal = () => setModalState(prevState => ({
      ...prevState,
      ["open"]: false,
    }))

    if (!incidents){
      $.get("https://itil-back.herokuapp.com/incident", function( data, status) {  
        setIncidents(data)
      })
    }

    const updateMessages = () => {
      $.get("https://itil-back.herokuapp.com/problem/" + problemId + "/comment", function( data, status) {
        setComments(data)
      })
    }

    if (modalState.update) {
      $.get("https://itil-back.herokuapp.com/problem/" + problemId, function( data, status) {
        setProblem(data)
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

 
    const takeProblem =  () => {
      let problem_data = {
        taken_by_id: user.sub
      };
      
      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/problem/" + problemId + "/take",
        data: JSON.stringify(problem_data),
        success: ()=>{updateDashboard();setModalOpen(false);},
        error: (result) => {updateDashboard();setModalOpen(false);console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      closeModal();
    }

    const solveProblem =  () => {
      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/problem/" + problemId + "/solve",
        success: ()=>{updateDashboard();setModalOpen(false);},
        error: (result) => {updateDashboard();setModalOpen(false);console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      closeModal();
    }

    

    const postMessage =  async (e) => {

      e.preventDefault()

      let url = "https://itil-back.herokuapp.com/problem/" + problemId + "/comment"
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

   
    if (problem && comments && incidents) {
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
            <div className="bg-white overflow-auto max-w-4xl w-full max-h-full rounded shadow-lg">
              {/* Search form */}

              <Grid container>
                <Grid item xs={12} sm={7}>
                    <div className="col-span-full xl:col-span-6 bg-white rounded-sm border-slate-200" style={{padding: '1%'}}>
                    <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
                    <h2 className="font-semibold text-slate-800 ">Informacion del problema</h2></header>

                  <div className="border-slate-200">

                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                  <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{problem.name}</div>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Creado Por</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{userIDToName(problem.created_by_id)}</div>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <header style={{display:'flex', justifyContent:'space-between'}}>
                        <h2 className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Tomado Por</h2>
                        <Button disabled={problem.status != 'creado'} onClick={(e) => { e.stopPropagation(); takeProblem();}}>Tomar</Button>  
                      </header>                   
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{userIDToName(problem.taken_by_id)}</div>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Prioridad</header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{problem.priority}</div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <header style={{display:'flex', justifyContent:'space-between'}}>
                        <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Estado</header>
                        <Button disabled={problem.status != 'tomado'} onClick={(e) => { e.stopPropagation(); solveProblem();}}>Resolver</Button>  
                      </header>
                      <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{problem.status}</div>
                    </Grid>
                  </Grid> 

                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de creacion</header>
                  <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{getOnlyDate(problem.created_on)}</div>             

                  </div>



                  <div className="overflow-x-auto">
                  <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Incidentes asociados</header>

                    <table className="table-auto w-full">
                  
                      <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                        <tr>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">ID</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Nombre</div>
                        </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm divide-y divide-slate-100">
                          {
                          
                          incidents.filter(c => c.problem_id == problemId).map(incident => {
                              return (
                              <tr key={incident.id}>
                                  <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{incident.id}</div>
                                  </td>
                                  <td className="p-2 whitespace-nowrap">           
                                  <div className="font-medium text-slate-800">{incident.name}</div>
                                  </td>
                              </tr>
                              )
                          })
                          }
                      </tbody>
                    </table>
                  </div>


            </div>


                </Grid>
                <Grid item xs={12} sm={5}>
                  <div className="col-span-full xl:col-span-6 bg-white rounded-sm" style={{padding: '1%'}}>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Comentarios</header>
                    <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-5 pr-4 overflow-y-scroll" style={{height: '300px'}}>
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
              <div className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"space-around", paddingBottom: "10px", paddingTop: "10px"}}>
                    <Button variant="text" onClick={closeModal}>Salir</Button>
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
    
    export default ModalInfoProblema;
    
