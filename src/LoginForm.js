import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody } from "reactstrap";


function NewItemForm({logIn}) {
    const history = useNavigate()
    const defaultLogin = {username:'', password:''}
    const [userInfo,setUserInfo] = useState(defaultLogin)
 
    
    const handleSubmit = async (evt) =>{
        try{
            evt.preventDefault()
            console.log("yes")
            await logIn(userInfo)
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
    
      <Card>
        <CardBody className="text-center">
            <h3>Login</h3>
            <div className="form-group">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input className="form-control" type="text" id="username" name="username" placeholder="ex. 'coolguy111'" value = {username} onChange={handleChange}></input>
                <br></br>
                <label htmlFor="password">password: </label>
                <input className="form-control" type="password" id="password" name="password" placeholder="ex. 'apple'" value = {password} onChange={handleChange}></input>
                <br></br>
                <input className="btn btn-primary" type="submit" value="Log in"></input>
            </form>
            </div>
        </CardBody>
      </Card>
  );
}

export default NewItemForm;
