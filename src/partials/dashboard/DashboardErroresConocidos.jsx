import React, { useState } from 'react';

import $ from 'jquery'; 

import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import InfoButton from './InfoButton';
import ModalCrearErrorConocido from './ModalCrearErrorConocido';
import swal from "sweetalert2";
import { Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DashboardErroresConocidos() {


  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false})
  const [itemID, setItemId] = useState(0)


  if (!items){
    $.get("https://itil-back.herokuapp.com/knownError", function( data, status) {
      setItems(data)
    })
  }

  const updateDashboard = () =>{
    setItems(null)
  }

  const deleteKnownErrorById = (id) => {
    let url = 'https://itil-back.herokuapp.com/knownError/' + id.toString();

    swal.fire({
        title: 'Borrar el error conocido',
        text: "¿Está seguro que desea borrar este error conocido?",
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
                    title: "Se borro exitosamente el error conocido con id " + id.toString() ,
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
          <h2 className="font-semibold text-slate-800">Errores Conocidos</h2>
          <CustomButton  onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        </header>

        <ModalCrearErrorConocido id="create-problem-modal" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard}/>

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
                    <div className="font-semibold text-left">Descripcion</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Solucion</div>
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
                        <td className="p-2 whitespace-nowrap">           
                          <div className="font-medium text-slate-800">{item.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">           
                          <div className="font-medium text-slate-800">{item.description}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">           
                          <div className="font-medium text-slate-800">{item.solution}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                        <div className="text-center">
                          <IconButton aria-label="delete" onClick = {()=>{deleteKnownErrorById(item.id)}} color="error">
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
  

export default DashboardErroresConocidos;
