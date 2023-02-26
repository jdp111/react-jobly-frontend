import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";


function UpdateUser({ update, user }) {
    const User = { firstName: "", lastName:"",email:""}
    const [userInfo,setUserInfo] = useState(User)
 
    


    const handleSubmit = async (evt) =>{
      console.log(userInfo)
      try{
          evt.preventDefault()
          await update(userInfo)}
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
    
    const { firstName, lastName, email } = userInfo
    
    return (
    
      <Card>
        <CardBody>
            <h3>Change Information:</h3>
          <div className="form-group">
          <form onSubmit={handleSubmit} >
            <br></br>
            <p>Username: </p>
            <p>{user.username}</p>
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
            <input type="submit" value="Update"></input>
          </form>
          </div>
        </CardBody>
      </Card>
  );
}

export default UpdateUser;
