import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardConfSoftware from '../partials/dashboard/DashboardConfSoftware';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

function ConfiguracionSoftware() {

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
              <DashboardConfSoftware />
              
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default ConfiguracionSoftware;