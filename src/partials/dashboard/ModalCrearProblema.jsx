import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import CustomButton from './CustomButton';

import $ from 'jquery'

import useUser from '../useUser';

  

/*{
    "name": "Problema prueba209",
    "created_by_id": "auth0|62a357a84b6448c8e4f8684c",
    "description": "Problema de prueba",
    "priority": "Baja"
    }*/
  

    

  function ModalCrearProblema({
    id,
    searchId,
    modalOpen,
    setModalOpen
  }) {

    //const postProblem = 
  
    const modalContent = useRef(null);
    const nameInput = useRef(null);
    const descInput = useRef(null);
    const priorityInput = useRef(null);

    const {user, isAdmin, isSupport} = useUser();
    
    const handleSubmit =  async (e) => {

      e.preventDefault()

      const form = new FormData(e.currentTarget);
      console.log(form);

      $.ajax({
        type: "POST",
        url: "https://itil-back.herokuapp.com/problem",
        data: JSON.stringify({"name": form.get("name"), 
                "description": form.get("description"), 
                created_by_id: user.sub,
                "priority": form.get("priority")}),
        error: (result) => {console.log(result)},
        dataType: "json",
        contentType: "application/json; charset=utf-8"
      });
    }
    // close on click outside
    useEffect(() => {
      const clickHandler = ({ target }) => {
        if (!modalOpen || modalContent.current.contains(target)) return
        setModalOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    });
  
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
      modalOpen && nameInput.current.focus();
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
          <div ref={modalContent} className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg">
            {/* Search form */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">

            <header className="px-5 py-4 border-b border-slate-100 bg-slate-50"> 
            <h2 className="font-semibold text-slate-800 ">Crear nuevo problema </h2></header>

            <form onSubmit={(e) => { handleSubmit(e); setModalOpen(false);}}  className="border-b border-slate-200">


            {/* <input id={searchId} */}
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Nombre</header>
                <label htmlFor={searchId} className="sr-only">Nombre</label>
                <input name="name" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Nombre…" ref={nameInput} />
                
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Descripcion</header>
                <label htmlFor={searchId} className="sr-only">Descripcion</label>
                <input name="description" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Descripcion…" ref={descInput} />

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Prioridad</header>
                <label htmlFor={searchId} className="sr-only">Prioridad</label>
                <input name="priority" className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4" type="text" placeholder="Prioridad…" ref={priorityInput} />
                
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2"> </header>
                <div type="submit" className="bg-slate-50" style={{width:"100%", display:"flex", justifyContent:"center", paddingBottom: "10px", paddingTop: "10px"}}>
                  <CustomButton  type="submit">Crear</CustomButton>
                </div>
              

            </form>
            </div>
            {/*setModalOpen(!modalOpen)*/}
          </div>
        </Transition>
      </>
    );
  }
    
    export default ModalCrearProblema;
    