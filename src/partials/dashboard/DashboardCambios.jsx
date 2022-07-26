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

import useUser from '../useUser';
import { permisosByUserID , customFilter} from '../../utils/Utils';

import ReactTable from 'react-table-6'
import "react-table-6/react-table.css";

function DashboardCambios() {

  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [modifyModalState, setModifyModalState] = useState({"open": false, "update": false});
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false});

  const {user, isAdmin, isSupport} = useUser();

  // const wrapperSetModifyModalState = useCallback(val => {
  //   setModifyModalState(val);
  // }, [setModifyModalState]);

  const [itemId, setItemId] = useState(0)
  
  if (!items) {
    $.get("https://itil-back.herokuapp.com/change", function( data, status) {
      data.map((row) => row.status = row.status.toUpperCase());
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
        <CustomButton className={permisosByUserID(user.sub).cambios.crear ? null : "d-none"} onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        
      </header>

      <ModalCrearCambio id="create-cambio-modal" searchId="create" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard}/>
      <ModalModificarCambio id="modify-cambio-modal" modalState={modifyModalState} setModalState={setModifyModalState} changeId={itemId} updateDashboard={updateDashboard}/>
      <ModalInfoCambio id="info-cambio-modal" modalState={infoModalState} setModalState={setInfoModalState} changeId={itemId} updateDashboard={updateDashboard}/>
      
      <div>
        <ReactTable
          data={items}
          columns={[
                {
                  id: "id",
                  Header: "ID",
                  accessor: "id",
                  maxWidth: 100,
                  className: 'text-center'
                  
                },
                {
                  id: "name",
                  Header: "Nombre",
                  accessor: row=>{return row},
                  minWidth: 300,
                  Cell: ({value,_}) => (<div onClick={(e) => { e.stopPropagation(); setItemId(value.id); setModifyModalState({"open":true,"update":true}); }} className="cursor-pointer font-medium text-slate-800">{value.name}</div>)
                },
                {
                  id: "priority",
                  Header: "Prioridad",
                  accessor: "priority",
                  className: 'text-center',
                  Filter: ({ filter, onChange }) =>
                    customFilter({ fieldName:'priority', filter, onChange , items})
                },
                {
                  Header: "Estado",
                  accessor: "status",
                  className: 'text-center',
                  Filter: ({ filter, onChange }) =>
                    customFilter({ fieldName:'status', filter, onChange , items})
                },
                {
                  Header: "Impacto",
                  accessor: "impact",
                  className: 'text-center',
                  Filter: ({ filter, onChange }) =>
                    customFilter({ fieldName:'impact', filter, onChange , items})
                },
                {
                  Header: "Problema",
                  accessor: "problem_id",
                  className: 'text-center',
                  filterable: false,
                  sortable: false,
                  maxWidth: 150
                },
                {
                  id: "info",
                  Header: "Info",
                  accessor: "id",
                  filterable: false,
                  sortable: false,
                  maxWidth: 150,
                  Cell: ({ value, _ }) =>
                    (<div className="text-center">
                  <InfoButton variant="text" onClick={(e) => { e.stopPropagation(); setItemId(value); setInfoModalState({"open": true, "update": true}); }}/>
                </div>)
                },

                ...(permisosByUserID(user.sub).cambios == 2) ? [{
                  id: "borrar",
                  Header: "Borrar",
                  accessor: "id",
                  filterable: false,
                  sortable: false,
                  maxWidth: 150,
                  Cell: ({ value, _ }) => ( // { value, columnProps: { rest: { someFunc } } }
                    <div className={"text-center "}>
                      <IconButton aria-label="delete" onClick = {()=>{deleteChangeById(value)}} color="error">
                        <DeleteIcon  />
                      </IconButton>
                      </div>
                  )
            }] : [],
          ]}
          defaultSorted={[
            {
              id: "id",
              desc: true
            }
          ]}
          filterable={true}
          defaultFiltered={[
            {
              //id: "name",
              //value: "acc"
            }
          ]}
          //onFilteredChange={(filtered) => this.setState({ filtered })}
          defaultPageSize={10}
          className="-striped -highlight"
          />
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
