import React, { useState } from 'react';

import $ from 'jquery'; 

import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import InfoButton from './InfoButton';
import ModalCrearErrorConocido from './ModalCrearErrorConocido';
import swal from "sweetalert2";
import { Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import useUser from '../useUser';
import { permisosByUserID , customFilter} from '../../utils/Utils';

import ReactTable from 'react-table-6'
import "react-table-6/react-table.css";

function DashboardErroresConocidos() {


  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false})
  const [itemID, setItemId] = useState(0)
  const {user, isAdmin, isSupport} = useUser();


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
          <CustomButton className={permisosByUserID(user.sub).errores == 2 ? null : "d-none"} onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        </header>

        <ModalCrearErrorConocido id="create-problem-modal" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard}/>

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
                  accessor: "name",
                  minWidth: 200,
                  className: 'font-medium text-slate-800'
                },
                {
                  id: "description",
                  Header: "Descripcion",
                  accessor: "description",
                  filterable: false,
                  sortable: false,
                  minWidth: 200,
                },
                {
                  id: "solution",
                  Header: "Solucion",
                  accessor: "solution",
                  filterable: false,
                  sortable: false,
                  minWidth: 200,
                },

                {
                  id: "borrar",
                  Header: "Borrar",
                  accessor: "id",
                  filterable: false,
                  sortable: false,
                  maxWidth: 150,
                  Cell: ({ value, _ }) => ( // { value, columnProps: { rest: { someFunc } } }
                    <div className={"text-center " + (permisosByUserID(user.sub).errores == 2 ? null : "d-none")}>
                      <IconButton aria-label="delete" onClick = {()=>{deleteKnownErrorById(value)}} color="error">
                        <DeleteIcon  />
                      </IconButton>
                      </div>
                  )
            },
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
  

export default DashboardErroresConocidos;
