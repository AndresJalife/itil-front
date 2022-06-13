import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardConfHardware from '../partials/dashboard/DashboardConfHardware';
import DashboardConfSoftware from '../partials/dashboard/DashboardConfSoftware';
import DashboardConfSLA from '../partials/dashboard/DashboardConfSLA';
import DashboardIncidentes from '../partials/dashboard/DashboardIncidentes';
import DashboardProblemas from '../partials/dashboard/DashboardProblemas';
import DashboardCambios from '../partials/dashboard/DashboardCambios';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  let [sidebarSelected, setSidebarSelected] = useState("inicio")
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} sidebarSelected={sidebarSelected} setSidebarSelected={setSidebarSelected} />
      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">


            {/* Welcome banner  <WelcomeBanner />*/ }
            

            

            {/* Cards <div className="grid grid-cols-12 gap-6">  </div>*/}
            

              {/* Card (Customers) */}
              {
                {
                  'inicio': <WelcomeBanner />,
                  'configuracion_hardware': <DashboardConfHardware />,
                  'configuracion_software': <DashboardConfSoftware />,
                  'configuracion_sla': <DashboardConfSLA />,
                  'incidentes': <DashboardIncidentes />,
                  'problemas': <DashboardProblemas />,
                  'cambios': <DashboardCambios />,
                  default: <WelcomeBanner></WelcomeBanner>

                }[sidebarSelected]}
              {/* <DashboardCard10 /> */}
             

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;
