import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Incidentes from './pages/incidentes';
import Problemas from './pages/problemas';
import Cambios from './pages/cambios';
import ConfiguracionSoftware from './pages/configuracion_software';
import ConfiguracionHardware from './pages/configuracion_hardware';
import ConfiguracionSLA from './pages/configuracion_sla';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/incidentes" element={<Incidentes />} />
        <Route exact path="/problemas" element={<Problemas />} />
        <Route exact path="/cambios" element={<Cambios />} />
        <Route exact path="/configuracion_software" element={<ConfiguracionSoftware />} />
        <Route exact path="/configuracion_hardware" element={<ConfiguracionHardware />} />
        <Route exact path="/configuracion_sla" element={<ConfiguracionSLA />} />
      </Routes>
    </>
  );
}

export default App;
