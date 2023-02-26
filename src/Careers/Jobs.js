import React, { useEffect, useState } from "react"
import JoblyApi from "../api"
import { Card, CardBody, CardHeader } from "reactstrap";
import SearchBar from "./SearchBar";
import {  NavLink} from "react-router-dom";



function Jobs({user}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [jobs, setJobs] = useState([])
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
        async function getJobs() {
            const jobList = await JoblyApi.getJobs(searchTerm)
            return jobList.jobs
        }

        getJobs().then((res)=>{
            setJobs(res);
        }).then(() =>{
            const jobIds = jobs.map((job)=>(job.id))
            applied.forEach((id)=>{
                if(jobIds.includes(id)){
                    console.log("running the document changer")
                    const button = document.getElementsByName(id)[0]
                    button.disabled = true
                    button.innerText = "Applied"
                }
            })
        })

    },[searchTerm,applied])


    const handleApply = async (evt)=>{
        const id = evt.target.name
        await JoblyApi.apply(user, id)
        setApplied((existing)=>{
            console.log(existing,id)
           return [...existing,parseInt(id)]

        })
        
    }


    return (
        <div>
            <h3>All Jobs</h3>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            
            {jobs && jobs.map((job)=>(
                <Card key = {job.id} className="job" >
                    <CardHeader>
                    <h6>{job.title}</h6>
                    <NavLink key = {job.id} className="jobnav" to={`/companies/${job.companyHandle}`}>
                        <p>{job.companyName}</p>
                    </NavLink>
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

export default Jobs