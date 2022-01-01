import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Redirect
} from "react-router-dom";
import PatientFinder from './components/PatientFinder'
import VendorLink from './components/VendorLink'
import PatientAdd from './components/PatientAdd'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  const [finderFlag, setFinderFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [homeFlag, setHomeFlag] = useState(true);
  const [linkFlag, setLinkFlag] = useState(false);

  if (homeFlag){
    return (
      <>
      <button class = 'SignOutButton' onClick={signOut}>Sign out</button>
      <h1 class = 'header'>Hello</h1>
      <div class = 'SubSec'>
        <h2>Choose Action</h2>
        <ul>
          <li><button class = 'ChoiceButton' onClick={() => { setAddFlag(true);setHomeFlag(false);}}>Add New Patient</button></li>
          <li><button class = 'ChoiceButton' onClick={() => {setFinderFlag(true);setHomeFlag(false);}}>Find Patient</button></li>
        </ul>
      </div>
      </>
    )
  }

  else{
    if (finderFlag){
      return (
      <div>
      <button class = 'SignOutButton' onClick={signOut}>Sign out</button>
      <button class = 'HomeButton' onClick={() => { setFinderFlag(false);setHomeFlag(true);}}>Home</button>
      <PatientFinder signOut={signOut}/>;
      </div>
      )
    }
    if (addFlag){
      return (
        <>
        <button class = 'SignOutButton' onClick={signOut}>Sign out</button>
        <button class = 'HomeButton' onClick={() => { setAddFlag(false);setHomeFlag(true);}}>Home</button>
        <PatientAdd signOut={signOut}/>
        </>
      )
    }
  }
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
    // <div>
    //   <h1>Application</h1>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/dashboard">
    //         <Dashboard />
    //       </Route>
    //       <Route path="/preferences">
    //         <Preferences />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
//   );
// }

// export default App;