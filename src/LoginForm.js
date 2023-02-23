import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import JoblyApi from "./api";

function NewItemForm({loggedIn, setLoggedIn}) {
    const history = useNavigate()
    const defaultLogin = {username:'', password:''}
    const [userInfo,setUserInfo] = useState(defaultLogin)
  
    
    const handleSubmit = async (evt) =>{
        try{
            evt.preventDefault()
            const token = await JoblyApi.request("auth/token", userInfo, "post")
            JoblyApi.token = token.token
            console.log("token", JoblyApi.token)
            setLoggedIn(true)
            history(`/`)}
        catch(e){
            setUserInfo(defaultLogin)
            return alert("username/password combination does not exist")
        }
    }

    // handles all form changes generically
    const handleChange = evt => {
        const {name, value} = evt.target
        setUserInfo(fdata =>(
            {...fdata,
            [name]:value}
        ))
    }
    
    const {username, password } = userInfo
    return (
    <section className="col-md-8">
        {loggedIn && history("/")}
        
      <Card>
        <CardBody className="text-center">
            <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="ex. 'coolguy111'" value = {username} onChange={handleChange}></input>
            <br></br>
            <label htmlFor="password">password:</label>
            <input type="text" id="password" name="password" placeholder="ex. 'apple'" value = {password} onChange={handleChange}></input>
            <br></br>
            <input type="submit" value="submit"></input>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}

export default NewItemForm;
