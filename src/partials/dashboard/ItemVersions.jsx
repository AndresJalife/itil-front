import {React, useState} from "react"
import LoadingData from "./LoadingData";
import {Alert, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';
import $, { data } from 'jquery'
import swal from 'sweetalert2';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvTimerIcon from '@mui/icons-material/AvTimer';

function ItemVersions({
  itemID,
  updateDashboard
  }) {

    const [versions, setVersions] = useState(null)
    
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
            icon: "success"});

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

    if (!versions){
        $.get("https://itil-back.herokuapp.com/config/" + itemID, function( data, status) {
        setVersions(data.config.versions)
        })
    }

    if (versions) {
        return (
            <div className="overflow-x-auto">
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
                    <div className="font-semibold text-left">Descripcion</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Rollback</div>
                </th>
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
                        <div className="font-medium text-slate-800">{version.description}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-slate-800">
                            <Button onClick={() => handleClickButton(version)} ><AccessTimeIcon></AccessTimeIcon></Button>
                            </div>
                        </td>

                    </tr>
                    )
                })
                }
            </tbody>
            </table>
            </div>
    )
    }
    else {
        return (<LoadingData/>)
    }
}

export default ItemVersions;
