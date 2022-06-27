import React, { useState } from 'react';

import $ from 'jquery'; 

import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import InfoButton from './InfoButton';
import ModalCrearProblema from './ModalCrearProblema';
import ModalInfoProblema from './ModalInfoProblema';
import swal from "sweetalert2";
import { Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function DashboardProblemas() {


  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false})
  const [itemID, setItemId] = useState(0)


  if (!items){
    $.get("https://itil-back.herokuapp.com/problem", function( data, status) {
      setItems(data)
    })
  }

  const updateDashboard = () =>{
    setItems(null)
  }

  const deleteProblemById = (id) => {
    let url = 'https://itil-back.herokuapp.com/problem/' + id.toString();

    swal.fire({
        title: 'Borrar el problema',
        text: "¿Está seguro que desea borrar este problema?",
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
                    title: "Se borro exitosamente el problema con id " + id.toString() ,
                    icon: "success"});
                    updateDashboard()
            })
        }
    });
}

  if (items) {
    return (
      <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
        
        <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
          <h2 className="font-semibold text-slate-800">Problemas</h2>
          <CustomButton  onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        </header>

        <ModalCrearProblema id="create-problem-modal" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard} />
        <ModalInfoProblema id="info-incident-modal" modalState={infoModalState} setModalState={setInfoModalState} problemId={itemID} updateDashboard={updateDashboard}/>

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
                        <td className="p-2 whitespace-nowrap">           
                          <div className="font-medium text-slate-800">{item.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.priority}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.status}</div>
                        </td>
                        {/* <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.descripcion}</div>
                        </td> */}
                        {/* <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.impacto}</div>
                        </td> */}
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-center">
                            <InfoButton variant="text" onClick={(e) => { e.stopPropagation(); setItemId(item.id); setInfoModalState({"open": true, "update": true}); }}/>
                          </div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                        <div className="text-center">
                          <IconButton aria-label="delete" onClick = {()=>{deleteProblemById(item.id)}} color="error">
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
  

export default DashboardProblemas;
