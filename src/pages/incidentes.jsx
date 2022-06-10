import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import DashboardIncidentes from '../partials/dashboard/DashboardIncidentes';
import Banner from '../partials/Banner';

function Incidentes() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} nombreUsuario={"Nombre Usuario"} rolUsuario={"Administrador"}/>
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Card (Customers) */}
              <DashboardIncidentes />
              
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Incidentes;