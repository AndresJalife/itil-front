import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardIncidentes() {

  const items = [
    {
      id: '1',
      nombre: 'No se puede acceder a la pagina web',
      prioridad: 'Baja',
      estado: 'Resuelto',
      creado_por: 'Mariano Rodriguez',
      tomado_por: 'Ana Martinez',
      descripcion: 'La pagina web se queda en blanco',
      impacto: 'Medio'
    },
    {
      id: '2',
      nombre: 'No se puede acceder a la pagina web',
      prioridad: 'Baja',
      estado: 'Resuelto',
      creado_por: 'Mariano Rodriguez',
      tomado_por: 'Ana Martinez',
      descripcion: 'La pagina web se queda en blanco',
      impacto: 'Medio'
    },
    {
      id: '3',
      nombre: 'Problema al loguearse',
      prioridad: 'Media',
      estado: 'Tomado',
      creado_por: 'Mariano Rodriguez',
      tomado_por: 'Raul Gonzalez',
      descripcion: 'Problema al loguearse',
      impacto: 'Bajo'
    },
    {
      id: '4',
      nombre: 'Servidor caido',
      prioridad: 'Alta',
      estado: 'Creado',
      creado_por: 'Pablo Hernandez',
      tomado_por: '-',
      descripcion: 'Servidor caido',
      impacto: 'Alto'
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Incidentes</h2>
        <div class="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full"> + Nuevo </div>  
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
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Descripción</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Impacto</div>
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
                        <div className="font-medium text-slate-800">{item.nombre}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.prioridad}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.estado}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.creado_por}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.tomado_por}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.descripcion}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.impacto}</div>
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

export default DashboardIncidentes;
