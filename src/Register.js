import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


function Register({ updateUser }) {
    const User = {username:"", password:"", firstName:"", lastName:"",email:""}
    const history = useNavigate()
    const [userInfo,setUserInfo] = useState(User)
 
    
    const handleSubmit = async (evt) =>{
      console.log(userInfo)
      try{
          evt.preventDefault()
          await updateUser(userInfo)
          history(`/`)}
      catch(e){
          console.log(e)
          return alert(e[0])
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
    
    const {username, password, firstName, lastName, email } = userInfo
    return (
      <Card>
        <CardBody>
            <h3>New User:</h3>
          <div className="form-group">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input className="form-control" type="text" id="username" name="username" placeholder="ex. 'coolguy111'" value = {username} onChange={handleChange}></input>
            <br></br>
            <label htmlFor="password">password: </label>
            <input className="form-control" type="password" id="password" name="password" placeholder="***" value = {password} onChange={handleChange}></input>
            <br></br>
            <label htmlFor="firstName">First Name: </label>
            <input className="form-control" type="firstName" id="firstName" name="firstName" placeholder="ex. 'John'" value = {firstName} onChange={handleChange}></input>
            <br></br>
            <label htmlFor="lastName">Last Name: </label>
            <input className="form-control" type="lastName" id="lastName" name="lastName" placeholder="ex. 'Doe'" value = {lastName} onChange={handleChange}></input>
            <br></br>
            <label htmlFor="email">Email: </label>
            <input className="form-control" type="email" id="email" name="email" placeholder="ex. 'Jobly@jobly.job'" value = {email} onChange={handleChange}></input>
            
            <br></br>
            <input className="btn btn-primary" type="submit" value="Sign up"></input>
          </form>
          </div>
        </CardBody>
      </Card>
  );
}

export default Register;
