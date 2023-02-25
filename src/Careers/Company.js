import React, { useEffect, useRef, useState } from "react"
import JoblyApi from "../api"
import { Card, CardBody, CardHeader } from "reactstrap";
import SearchBar from "./SearchBar";
import { useNavigate, useParams } from "react-router-dom";



function Company({user}) {
    const {handle}  = useParams()
    const [searchTerm, setSearchTerm] = useState("")
    const [company, setCompany] = useState({name:null, jobs:[]})
    const [applied, setApplied] = useState([])
    
    useEffect(()=>{
        async function markApplied() {
            if (!user){
                return []
            }
            const userInfo = await JoblyApi.getUser(user)
            const appliedList = userInfo.applications
            return appliedList
            
        }
        markApplied().then((res)=>{
            setApplied(res)
        })
        
    },[user])

    useEffect(()=>{
        async function getCompany() {
            const Company = await JoblyApi.getCompany(handle)
            return Company.company
        }

        getCompany().then((res)=>{
            setCompany(res);
            console.log(company)
        }).then(() =>{
            const jobIds = company.jobs.map((job)=>(job.id))
            applied.forEach((id)=>{
                if(jobIds.includes(id)){
                    const button = document.getElementsByName(id)[0]
                    button.disabled = true
                    button.innerText = "Applied"
                }
            })
        })

    },[searchTerm,applied])


    const handleApply = async (evt)=>{
        const id = evt.target.name
        const apply = await JoblyApi.apply(user, id)
        setApplied((existing)=>{
           return [...existing,parseInt(id)]

        })
        
    }

    return (
        <div>
            <h3>{handle}</h3>
            {company.name && (
                <div>
                <span>
                    <small>number of employees:  {company.numEmployees}</small>
                </span>
                <p>{company.description}</p>
                </div>
            )}


            {company.name && company.jobs.map((job)=>(
                <Card key = {job.id} className="job" >
                    <CardHeader>
                    <h6>{job.title}</h6>
                    <p>{job.companyName}</p>
                    </CardHeader>
                    <CardBody className="container" >  
                    <div className="row">
                        <div className="col-sm">
                            <button name={job.id} onClick={handleApply} className=" btn btn-success ">Apply</button>
                        </div>
                        
                        <div className="col-sm">
                            <span>salary:  {job.salary}</span>
                        </div>

                        <div className="col-sm">
                            <span>equity:</span>
                            
                            {job.equity===null
                                ? <span className="text-danger" >unavailable</span>
                                : <span>{job.equity}</span>
                            }
                        </div>
                        
                        <div className="col-sm"></div>
                        
                    </div>
                    </CardBody>
                </Card>
            ))}

        </div>
    )


}

export default Company