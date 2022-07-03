import React, { useState } from 'react';

import $ from 'jquery'; 

import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import InfoButton from './InfoButton';
import { IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCrearConfSoftware from './ModalCrearConfSoftware';
import ModalInfoConfSoftware from './ModalInfoConfSoftware';
import ItemVersions from './ItemVersions';
import {Alert, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";
import useUser from '../useUser';
import swal from "sweetalert2";
import { permisosByUserID , customFilter } from '../../utils/Utils';

function DashboardConfSoftware() {

  const [items, setItems] = useState(null)
  const [itemId, setItemId] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [infoModalState, setInfoModalState] = useState({"open": false, "update": false})
  const {user, isAdmin, isSupport} = useUser();

  if (!items){
    $.get("https://itil-back.herokuapp.com/config", function( data, status) {
      setItems(data)
    })
  }
  
  const updateDashboard = () => {
    setItems(null)
  }
  
  const deleteConfigById = (id) => {
    let url = 'https://itil-back.herokuapp.com/config/' + id.toString();

    swal.fire({
        title: 'Borrar el item de configuracion',
        text: "¿Está seguro que desea borrar este item de software?",
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
                    title: "Se borro exitosamente el item de configuracion con id " + id.toString() ,
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

    //return (<ItemVersions></ItemVersions>)
  return (
    <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Configuracion de Hardware</h2>
        <CustomButton  onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        <ModalCrearConfSoftware id="create-confsoft-modal" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} updateDashboard={updateDashboard} />
        <ModalInfoConfSoftware id="info-software-modal" modalState={infoModalState} setModalState={setInfoModalState} itemID={itemId} updateDashboard={updateDashboard}/>
      </header>
      
      <div>
        <ReactTable
          data={items.filter(item => item.config.versions[0].config_type === 'software' )}
          columns={[
                {
                  id: "id",
                  Header: "ID",
                  accessor: "config.versions[0].id",
                  maxWidth: 100,
                  className: 'text-center'
                  
                },
                {
                  id: "name",
                  Header: "Nombre",
                  accessor: "config.versions[0].name",
                  minWidth: 300,
                  className: 'font-medium text-slate-800'
                },
                {
                  id: "version",
                  Header: "Version",
                  accessor: "config.current_version",
                  className: 'text-center'
                },
                {
                  id: "type",
                  Header: "Tipo",
                  accessor: "config.versions[0].type",
                  className: 'text-center'
                },
                {
                  id: "provider",
                  Header: "Proveedor",
                  accessor: "config.versions[0].provider",
                  className: 'text-center'
                },
                {
                  id: "licences",
                  Header: "Licencias",
                  accessor: "config.versions[0].licences",
                  className: 'text-center'
                },
                
                {
                  id: "info",
                  Header: "Info",
                  accessor: "config.id",
                  filterable: false,
                  sortable: false,
                  maxWidth: 150,
                  Cell: ({ value, _ }) =>
                    (<div className="text-center">
                  <InfoButton variant="text" onClick={(e) => { e.stopPropagation(); setItemId(value); setInfoModalState({"open": true, "update": true}); }}/>
                </div>)
                },

                {
                  id: "borrar",
                  Header: "Borrar",
                  accessor: "config.id",
                  filterable: false,
                  sortable: false,
                  maxWidth: 150,
                  Cell: ({ value, _ }) => ( // { value, columnProps: { rest: { someFunc } } }
                    <div className={"text-center " + (permisosByUserID(user.sub).configuracion == 2 ? null : "d-none")}>
                      <IconButton aria-label="delete" onClick = {()=>{deleteConfigById(value)}} color="error">
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


export default DashboardConfSoftware;
