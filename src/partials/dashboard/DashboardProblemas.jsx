import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardProblemas() {

  const items = [
    {
      id: '1',
      nombre: 'Error en página principal',
      prioridad: 'Baja',
      estado: 'Pendiente',
      creado_por: 'Ana Martinez',
      tomado_por: null,
      descripcion: 'Los usuarios no pueden acceder a la pagina',
      impacto: 'Medio'
    },
    {
      id: '2',
      nombre: 'Error en pantalla de login',
      prioridad: 'Alta',
      estado: 'Resuelto',
      creado_por: 'Miguel Carlos',
      tomado_por: 'Pablo Gomez',
      descripcion: 'No se pueden ingresar los datos en ciertos dispositivos móviles',
      impacto: 'Medio'
    },
    {
      id: '3',
      nombre: 'Servidor se encuentra caído',
      prioridad: 'Alta',
      estado: 'Tomado',
      creado_por: 'Sofia Blanco',
      tomado_por: 'Raul Gonzalez',
      descripcion: 'El servidor 02 se encuentra offline desde ayer',
      impacto: 'Bajo'
    }

  ];

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

export default DashboardProblemas;
