import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';

import $, { data } from 'jquery'

import useUser from '../useUser';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
  
import { userIDToName } from '../../utils/Utils';


function ModalInfoProblema({
    id,
    modalState,
    setModalState,
    problemId,
    updateDashboard
  }) {

    const [problem, setProblem] = useState(null);

    const {user, isAdmin, isSupport} = useUser();
    
    const closeModal = () => setModalState(prevState => ({
      ...prevState,
      ["open"]: false,
    }))


    if (modalState.update) {
      $.get("https://itil-back.herokuapp.com/problem/" + problemId, function( data, status) {
        setProblem(data)
        setModalState(prevState => ({
          ...prevState,
          ["update"]: false
        }))
      })
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
        success: ()=>{setModalOpen(false)},
        error: (result) => {console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      updateDashboard();
      closeModal();
    }

    const solveProblem =  () => {
      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/problem/" + problemId + "/solve",
        success: ()=>{setModalOpen(false)},
        error: (result) => {console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
      updateDashboard();
      closeModal();
    }

   
    if (problem) {
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
                <h2 className="font-semibold text-slate-800 ">Informacion del problema</h2></header>

              <div className="border-b border-slate-200">

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
    
    export default ModalInfoProblema;
    
