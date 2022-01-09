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
import Finder from './components/Finder'
import Adder from './components/Adder'
import Import from './components/Import'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Row, Stack} from 'react-bootstrap'

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  const [finderFlag, setFinderFlag] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [homeFlag, setHomeFlag] = useState(true);
  const [importFlag, setImportFlag] = useState(false);

  const SignOutButton = <Button variant = 'outline-dark' size = 'sm' onClick={signOut}>Sign out</Button>

  if (homeFlag){
    return (
      <Container fluid>
        {SignOutButton}<br/>
        <Stack gap = {2}>
          <div class="d-flex justify-content-center"><h1>Welcome</h1></div>

          <h2>Choose Action</h2>

          <Stack gap={3}>
            <Row>
            <Button variant="outline-primary" size="lg" onClick={() => { setAddFlag(true);setHomeFlag(false);}}>Add Patient Record</Button>
            </Row>
            
            <Row>
            <Button variant="outline-primary" size="lg" onClick={() => {setFinderFlag(true);setHomeFlag(false);}}>Find Records</Button>
            </Row>

            <Row>
            <Button variant="outline-primary" size="lg" onClick={() => {setImportFlag(true);setHomeFlag(false);}}>Import from Spreadsheet</Button>
            </Row>

          </Stack>

        </Stack>

      </Container>
    )
  }

  else{
    if (finderFlag){
      return (
      <Container fluid>
        <Stack gap={2}>
        <Row>
        <div class="RuttonRow">
          {SignOutButton}
          <Button variant = 'secondary' size = 'sm' onClick={() => { setFinderFlag(false);setHomeFlag(true);}}>Home</Button>
        </div>
        </Row>
        {/* <PatientFinder signOut={signOut}/>; */}
        <Row><Finder/></Row>
        </Stack>
      </Container>
      )
    }
    if (addFlag){
      return (
        <Container fluid>
        {SignOutButton}
        <Button variant = 'secondary'  size = 'sm' onClick={() => { setAddFlag(false);setHomeFlag(true);}}>Home</Button>
        {/* <PatientAdd signOut={signOut}/> */}
        <Adder/>
        </Container>
      )
    }

    if (importFlag){
      return (
        <Container fluid>
        {SignOutButton}
        <Button variant = 'secondary'  size = 'sm' onClick={() => { setAddFlag(false);setHomeFlag(true);}}>Home</Button>
        <Import/>
        </Container>
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