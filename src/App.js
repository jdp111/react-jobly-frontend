import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar"
import LoginForm from "./LoginForm"
import HomePage from "./HomePage"
import JoblyApi from "./api";
import Register from "./Register"
import UpdateUser from './UpdateUser';
import Companies from './Careers/Companies';
import Jobs from './Careers/Jobs';

function App() {
  const defaultUser = {username:null,firstName:null, lastName:null, email:null}
  const [currentUser, setCurrentUser] = useState(defaultUser)

  useEffect(()=>{
    async function effect() {
    const localToken = localStorage.getItem('token') || null
    const localUser = localStorage.getItem('username') || null
    
    if (localToken && localUser) {
      const {username, firstName, lastName, email}  = await JoblyApi.getUser(localUser)
      setCurrentUser({username, firstName, lastName, email} )
    }
  } effect()
  },[])


  const setDataOnLogin = async (userInfo, newToken) => {
    
    localStorage.setItem('token', newToken.token);
    localStorage.setItem('username', userInfo.username)
    const {username, firstName, lastName, email} = await JoblyApi.getUser(userInfo.username)
    setCurrentUser({username, firstName, lastName, email})
  }

  const login = async (userInfo) => {
    const token = await JoblyApi.request("auth/token", userInfo, "post")
    await setDataOnLogin(userInfo, token)
  }

  const signup = async (userInfo) => {
    const newToken = await JoblyApi.request("auth/register", userInfo, "post")
    await setDataOnLogin(userInfo, newToken)
    
  }
  
  const update = async (newInfo) => {
    const {username, firstName, lastName, email} = await JoblyApi.request(`users/${newInfo.username}`, newInfo, "patch")
    setCurrentUser({username, firstName, lastName, email})
  }

  const logout = () => {
    localStorage.clear('token')
    localStorage.clear('username')
    setCurrentUser(false)
  }

  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar loggedin = {currentUser.username} logout ={logout}/>
        
        <main>
          <Routes>
          <Route exact="true" path = '/' element={<HomePage username={currentUser.username}/>}>
            </Route>
          <Route exact="true" path = '/login' element={<LoginForm logIn={login} auth = {currentUser}/>}>
            </Route>
          <Route exact="true" path = '/user' element={<UpdateUser update = {update} user = {currentUser}/>}>
            </Route>
          <Route exact="true" path = '/register' element={<Register updateUser = {signup} />}>
            </Route>
          <Route exact="true" path = '/companies' element={<Companies/>}>
            </Route>
          <Route path = '/companies/:handle'>
          </Route>
          <Route exact="true" path = '/jobs' element={<Jobs user={currentUser.username}/>}>
            </Route>

          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
