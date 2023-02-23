import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar"
import LoginForm from "./LoginForm"


function App() {

  const [auth, setAuth] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar loggedin = {auth}/>
        
        <main>
          <Routes>
          <Route exact="true" path = '/'>
            </Route>
            <Route exact="true" path = '/login' element={<LoginForm loggedIn = {auth} setLoggedIn = {setAuth} />}>
            </Route>
            <Route exact="true" path = '/register'>
            </Route>
            <Route exact="true" path = '/companies'>
            </Route>
            <Route exact="true" path = '/jobs'>
            </Route>




          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
