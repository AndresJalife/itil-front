import {React, useState} from "react"
import LoadingData from "./LoadingData";
import {Alert, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
import $, { data } from 'jquery'
import swal from 'sweetalert2';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ModalCrearConfHardware from "./ModalCrearConfHardware";
import ModalCrearConfSoftware from "./ModalCrearConfSoftware";
import ModalCrearConfSLA from "./ModalCrearConfSLA";
import useCollapse from "react-collapsed";

function ItemVersions({
  itemID,
  updateDashboard,
  enableVersionChange,
  type,
  oldVersionItem,item,modalOpen,setModalOpen
  }) {
    const [loadedID, setLoadedID] = useState(null)

    const [versions, setVersions] = useState(null)

    const [createModalSoftOpen, setCreateModalSoftOpen] = useState(false)
    const [createModalHardOpen, setCreateModalHardOpen] = useState(false)
    const [createModalSlaOpen, setCreateModalSlaOpen] = useState(false)

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({defaultExpanded: true, duration: 200});


    
    const handleClickButton = (new_version) => {
      
      let new_config = {
        "config_type": new_version.config_type,
        "current_version": new_version.version_number,
        "name": new_version.name,
        "type": new_version.type,
        "provider": new_version.provider,
        "version": new_version.version,
        "licences": new_version.licences,
        "acceptance_date": new_version.acceptance_date,
        "service": new_version.service,
        "service_manager": new_version.service_manager,
        "start_date": new_version.start_date,
        "end_date": new_version.end_date,
        "crucial": new_version.crucial,
        "location": new_version.location,
        "price": new_version.price,
        "installation_date": new_version.installation_date,
        "capacity": new_version.capacity,
        "serial_number": new_version.serial_number
      };

      console.log(JSON.stringify(new_config))
      
      let url = "https://itil-back.herokuapp.com/config/" + itemID;
      let data = JSON.stringify(new_config);
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json; charset=utf-8"},
        body: data,
      })
      .then((response) => {
        if (response.ok){
          swal.fire({
            title: "Se cambió de versión exitosamente",
            icon: "success"}).then(setVersions(null));

          updateDashboard();
        } else {
          console.log(response)
          swal.fire({
            title: "Ocurrió un error: ",
            text: response.statusText,
            icon: "error"});
        }})
      .catch((error) => {console.log(error); swal.fire({
        title: "Ocurrió un error: ",
        text: error.message,
        icon: "error"});});
        
    }

    if (!versions || loadedID!=itemID){
        $.get("https://itil-back.herokuapp.com/config/" + itemID, function( data, status) {
          setVersions(data.config.versions)
          setLoadedID(itemID)
        })
    }

    if (versions) {
        return (<>
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2" style={{display:'flex', justifyContent:'space-between'}}>
          <h2 className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Version actual</h2>
          {enableVersionChange? <Button onClick={(e) => { e.stopPropagation(); switch (type){
                                                                                        case 'software':
                                                                                          setCreateModalSoftOpen(true);
                                                                                        break;
                                                                                        case 'hardware':
                                                                                          setCreateModalHardOpen(true);
                                                                                        break;
                                                                                        case 'SLA':
                                                                                          setCreateModalSlaOpen(true);
                                                                                        break;}}}>Nueva version</Button>  : ""}
        </header>
        <div className="w-full border-0 focus:ring-transparent placeholder-slate-400 appearance-none py-3 pl-10 pr-4">{item.version_number}</div>

        <div className="collapsible">
          <div className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2" {...getToggleProps()}>
              {isExpanded ? 'Versiones anteriores  ▽' : 'Versiones anteriores  ▼'} </div>
          <div {...getCollapseProps()}> <div className="overflow-x-auto">
            <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                <tr>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Version</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Fecha de creacion</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Nombre</div>
                </th>
                {enableVersionChange? <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Rollback</div>
                </th>: ""}

                </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
                {
                
                versions.map(version => {
                    return (
                    <tr key={version.id}>
                        <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{version.version_number}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{version.created_on}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">           
                        <div className="font-medium text-slate-800">{version.name}</div>
                        </td>

                        {enableVersionChange? <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-slate-800">
                            <Button onClick={() => handleClickButton(version)} ><AccessTimeIcon></AccessTimeIcon></Button>
                            </div>
                        </td> : ""}

                    </tr>
                    )
                })
                }
            </tbody>
            </table>
            </div>
            </div>

            <ModalCrearConfHardware oldVersionItem={oldVersionItem} item={item} modalOpen={createModalHardOpen} setModalOpen={setCreateModalHardOpen} updateDashboard={() => {setVersions(null); updateDashboard()}} />
            <ModalCrearConfSLA  oldVersionItem={oldVersionItem} item={item} modalOpen={createModalSlaOpen} setModalOpen={setCreateModalSlaOpen} updateDashboard={() => {setVersions(null); updateDashboard()}} />
            <ModalCrearConfSoftware  oldVersionItem={oldVersionItem} item={item} modalOpen={createModalSoftOpen} setModalOpen={setCreateModalSoftOpen} updateDashboard={() => {setVersions(null); updateDashboard()}} />

       </div>           
       </>
    )
    }
    else {
        return (<LoadingData/>)
    }
}

export default ItemVersions;
