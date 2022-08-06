import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../utils/Transition';
import ItemVersions from './ItemVersions';
import useUser from '../useUser';
import {Alert, Button, InputLabel, MenuItem, OutlinedInput, Grid} from '@mui/material';
import { userIDToName, getOnlyDate } from '../../utils/Utils';
import useCollapse from 'react-collapsed';
import ModalCrearConfSoftware from './ModalCrearConfSoftware';

import $, { data } from 'jquery'

function ModalInfoConfSoftware({
    id,
    modalState,
    setModalState,
    itemID,
    updateDashboard,
    enableVersionChange
  }) {

  const [item, setItem] = useState(null);
  const {user, isAdmin, isSupport} = useUser();
  const [createModalOpen, setCreateModalOpen] = useState(false)
  
  const closeModal = () => {
    setModalState(prevState => ({
      ...prevState,
      ["open"]: false,
    }));
    updateDashboard();
  }

  const updateInfo = () => {
    setModalState(prevState => ({
    ...prevState,
    ["update"]: true,
    }))
  }

  if (modalState.update) {
    $.get("https://itil-back.herokuapp.com/config/" + itemID, function( data, status) {
      setItem(data.config.versions.find((e) => e.version_number === data.config.current_version))
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
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.name}</div>
 
                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Proveedor</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.provider}</div>

                <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Licencias</header>
                <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.licences}</div>
                           
                 <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Fecha de aceptacion</header>
                 <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{getOnlyDate(item.acceptance_date)}</div>

                
  
                  <ItemVersions itemID={itemID} type={item.config_type}  enableVersionChange={enableVersionChange} 
                  oldVersionItem={true} item={item} modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateInfo}
                  />     
                 
                 
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
    
export default ModalInfoConfSoftware;
    
