import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {

  const items = [
    {
      id: '0',
      name: 'Computadora1',
      tipo: 'Notebook',
    },
    {
      id: '1',
      name: 'Tablet1',
      tipo: 'Tablet',
    },
    {
      id: '2',
      name: 'Computadora2',
      tipo: 'Notebook',
    },
    {
      id: '3',
      name: 'Impresora1',
      tipo: 'Impresora',
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Configuracion de Hardware</h2>
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

export default DashboardCard10;
