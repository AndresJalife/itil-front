import {React, useState} from "react"
import LoadingData from "./LoadingData";
import {Alert, Button,FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AvTimerIcon from '@mui/icons-material/AvTimer';

function ItemVersions(
    item_id
) {

    const [versions, setVersions] = useState(null)
    const handleClickButton = (e) => {}

    if (!versions){
        let data = [{"id":1, "date": "24/05/2022", "description": "Se aumentó memoria"}, {"id":2, "date": "10/06/2022", "description": "Se actualizó sistema operativo"}]
        //$.get("https://itil-back.herokuapp.com/problem", function( data, status) {
        setVersions(data)
        //})
    }

    if (versions) {
        return (
            <div className="overflow-x-auto">
            <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                <tr>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Fecha</div>
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
                        <div className="text-left">{version.id}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{version.date}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">           
                        <div className="font-medium text-slate-800">{version.description}</div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-slate-800">
                            <Button onClick={() => handleClickButton(version.id)} ><AccessTimeIcon></AccessTimeIcon></Button>
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
