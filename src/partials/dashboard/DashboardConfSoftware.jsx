import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardConfSoftware() {

  const items = [
    {
      id: '0',
      name: 'Windows 11',
      tipo: 'Sistema Operativo',
      version: '11.1',
      proveedor: 'Microsoft',
      fecha_aceptacion: '15/6/2019',
    },
    {
      id: '1',
      name: 'Excel',
      tipo: 'Planilla',
      version: '3.7',
      proveedor: 'Microsoft',
      fecha_aceptacion: '11/8/2011',
    },
    {
      id: '2',
      name: 'Outlook',
      tipo: 'Mensajeria',
      version: '7.2',
      proveedor: 'Microsoft',
      fecha_aceptacion: '23/10/2018',
    },
    {
      id: '3',
      name: 'iOS',
      tipo: 'Sistema Operativo',
      version: '12.1.0',
      proveedor: 'Apple',
      fecha_aceptacion: '7/2/2018',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Configuracion de Software</h2>
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
                  <div className="font-semibold text-left">Tipo</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Version</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Proveedor</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Fecha de aceptacion</div>
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
                        <div className="text-left">{item.tipo}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.version}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.proveedor}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.fecha_aceptacion}</div>
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
}

export default DashboardConfSoftware;
