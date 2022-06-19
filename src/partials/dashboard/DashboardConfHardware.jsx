import React, { useState } from 'react';

import $ from 'jquery'; 

import LoadingData from './LoadingData';
import CustomButton from './CustomButton';
import ModalCrearProblema from './ModalCrearProblema';
import ItemVersions from './ItemVersions';

function DashboardConfHardware() {

  const [items, setItems] = useState(null)

  const [createModalOpen, setCreateModalOpen] = useState(false)

  if (!items){
    //hacer get
    let data=[
      {
        id: '0',
        name: 'Computadora1',
        tipo: 'Notebook',
        nro_serie: 45,
        localizacion: 'Belgrano',
        proveedor: 'Dell',
        precio: 10000,
        fecha_instalacion: '15/6/2016',
        capacidad: 512,
      },
      {
        id: '1',
        name: 'Tablet1',
        tipo: 'Tablet',
        nro_serie: 765,
        localizacion: 'San Telmo',
        proveedor: 'Apple',
        precio: 20000,
        fecha_instalacion: '29/3/2019',
        capacidad: 32,
      },
      {
        id: '2',
        name: 'Computadora2',
        tipo: 'Notebook',
        nro_serie: 1,
        localizacion: 'La Plata',
        proveedor: 'Lenovo',
        precio: 15000,
        fecha_instalacion: '3/7/2017',
        capacidad: 32,
      },
      {
        id: '3',
        name: 'Impresora1',
        tipo: 'Impresora',
        nro_serie: 45,
        localizacion: 'Belgrano',
        proveedor: 'HP',
        precio: 20000,
        fecha_instalacion: '15/11/2016',
        capacidad: 0,
      },
    ];
    setItems(data)
  }

  if (items) {

    //return (<ItemVersions></ItemVersions>)
  return (
    <div className="col-span-full xl:col-span-max bg-white shadow-lg rounded-sm border border-slate-200">
      
      <header className="px-5 py-4 border-b border-slate-100" style={{display:'flex', justifyContent:'space-between', cursor:'pointer'}}>
        <h2 className="font-semibold text-slate-800">Configuracion de Hardware</h2>
        <CustomButton  onClick={(e) => { e.stopPropagation(); setCreateModalOpen(true);}}>+ Nuevo </CustomButton>  
        <ModalCrearProblema id="create-confhard-modal" modalOpen={createModalOpen} setModalOpen={setCreateModalOpen} />

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
                  <div className="font-semibold text-left">Nro Serie</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Localizacion</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Proveedor</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Precio</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Fecha de instalacion</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Capacidad</div>
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
                        <div className="text-left">{item.nro_serie}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.localizacion}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.proveedor}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.precio}$</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.fecha_instalacion}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.capacidad} GB</div>
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
            } else {
              return ( <LoadingData/> )
            }
}

export default DashboardConfHardware;
