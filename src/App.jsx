import React, { useEffect } from 'react';
import {
  Route,
  useLocation, Switch, Router, Redirect
} from 'react-router-dom';

import './index.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Incidentes from './pages/incidentes';
import Problemas from './pages/problemas';
import Cambios from './pages/cambios';
import ConfiguracionSoftware from './pages/configuracion_software';
import ConfiguracionHardware from './pages/configuracion_hardware';
import ConfiguracionSLA from './pages/configuracion_sla';
import NuevoCambio from './pages/nuevo_cambio';
import {useAuth0} from "@auth0/auth0-react";
import Loading from "./partials/Loading";
import history from "./utils/history";

function App() {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    loginWithRedirect({scope: 'read:current_user'});
    return <Loading />;
  }

  return (

    
   <Router history={history}>
      <Switch>
       <Route exact path="/" component={Dashboard} />
        {/* {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />} */}
      

        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/nuevoCambio" component={NuevoCambio} />
      </Switch>
    </Router>
  );
}

export default App;
