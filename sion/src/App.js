import { Amplify, API } from 'aws-amplify';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import PatientFinder from './components/PatientFinder'
import VendorLink from './components/VendorLink'
import MainMenu from './components/MainMenu.js'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <div>
      {/* <MainMenu user={user} signOut={signOut}/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <MainMenu />
          </Route>
          <Route path="/finder">
            <PatientFinder />
          </Route>
          <Route path="/linker">
            <VendorLink />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);



// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import './App.css';
// import Dashboard from './components_test/Dashboard';
// import Login from './components_test/Auth';
// import Preferences from './components_test/Preferences';
// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

// function App() {
//   const [token, setToken] = useState();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }

//   return (
//     <div>
//       <h1>Application</h1>
      // <BrowserRouter>
      //   <Routes>
      //     <Route path="/dashboard">
      //       <Dashboard />
      //     </Route>
      //     <Route path="/preferences">
      //       <Preferences />
      //     </Route>
      //   </Routes>
      // </BrowserRouter>
//     </div>
//   );
// }

// export default App;