import React, { useState , useCallback} from 'react';

import $ from 'jquery'; 

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import InfoButton from './InfoButton';
import ModalCrearCambio from './ModalCrearCambio';
import ModalModificarCambio from './ModalModificarCambio';
import ModalInfoCambio from './ModalInfoCambio';
import swal from "sweetalert2";
import { Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DashboardCambios() {

  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [modifyModalState, setModifyModalState] = useState({"open": false, "update": false});
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false});

  // const wrapperSetModifyModalState = useCallback(val => {
  //   setModifyModalState(val);
  // }, [setModifyModalState]);

  const [itemId, setItemId] = useState(0)
  
  if (!items) {
    $.get("https://itil-back.herokuapp.com/change", function( data, status) {
      setItems(data);
    })
  }

  const updateDashboard = () =>{
    setItems(null)
  }


  const deleteChangeById = (id) => {
      let url = 'https://itil-back.herokuapp.com/change/' + id.toString();

      swal.fire({
          title: 'Borrar el cambio',
          text: "¿Está seguro que desea borrar este cambio?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          dangerMode: 'true',
          confirmButtonText: 'Borrar',
          cancelButtonText: 'Cancelar'
      }).then(answer=>{
          if(answer.isConfirmed){
              fetch(url, {
                  method: 'DELETE'}).then(() => {
                  swal.fire({
                      title: "Se borro exitosamente el cambio con id " + id.toString() ,
                      icon: "success"});
                  setItems(null)
              }).catch((error) => {console.log(error); swal.fire({
                title: "Ocurrió un error: ",
                text: error.message,
                icon: "error"});});
          }
      });
  }

  if (items) {

  return (
    <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Cambios</h2>
        <CustomButton  onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        
      </header>

      <ModalCrearCambio id="create-cambio-modal" searchId="create" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard}/>
      <ModalModificarCambio id="modify-cambio-modal" modalState={modifyModalState} setModalState={setModifyModalState} changeId={itemId} updateDashboard={updateDashboard}/>
      <ModalInfoCambio id="info-cambio-modal" modalState={infoModalState} setModalState={setInfoModalState} changeId={itemId} updateDashboard={updateDashboard}/>

      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Prioridad</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Estado</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Impacto</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Problema</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Info</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Borrar</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                items.map(item => {
                  return (
                    <tr key={item.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.id}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap" style={{cursor:'pointer'}}>           
                        <div onClick={(e) => { e.stopPropagation(); setItemId(item.id); setModifyModalState({"open":true,"update":true}); }} className="font-medium text-slate-800">{item.name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.priority}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.status}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.impact}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">{item.problem_id}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-center">
                          <InfoButton variant="text" onClick={(e) => { e.stopPropagation(); setItemId(item.id); setInfoModalState({"open": true, "update": true}); }}/>
                        </div>
                      </td>

                      <td className="p-2 whitespace-nowrap">
                      <div className="text-center">
                        <IconButton aria-label="delete" onClick = {()=>{deleteChangeById(item.id)}} color="error">
                          <DeleteIcon  />
                        </IconButton>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
  } else {
    return (
      <LoadingData/>
    )
  }
}

export default DashboardCambios;
