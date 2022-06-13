import React, { useState } from 'react';

import $ from 'jquery'; 

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import LoadingData from './LoadingData';

function DashboardProblemas() {


  const [items, setItems] = useState(null)


  $.get("https://itil-back.herokuapp.com/problem", function( data, status) {
    setItems(data)
  })

  if (items) {
    return (
      <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
        
        <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
          <h2 className="font-semibold text-slate-800">Problemas</h2>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"> + Nuevo </div>  
        </header>
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
                    <div className="font-semibold text-left">Creado por</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Tomado por</div>
                  </th>
                  {/* <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Descripción</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Impacto</div>
                  </th> */}
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
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.created_by_id}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.taken_by_id}</div>
                        </td>
                        {/* <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.descripcion}</div>
                        </td> */}
                        {/* <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{item.impacto}</div>
                        </td> */}
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
