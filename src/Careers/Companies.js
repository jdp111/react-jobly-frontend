import React, { useEffect, useState } from "react"
import JoblyApi from "../api"
import { Card, CardBody, CardHeader } from "reactstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";


function Companies() {

    const [searchTerm, setSearchTerm] = useState("")
    const [comps, setComps] = useState(false)



    useEffect(()=>{
        async function getCompanies() {
            const companyList = await JoblyApi.getCompanies(searchTerm)
            return companyList.companies
        }
        getCompanies().then((res)=>{
            setComps(res);
        })
    },[searchTerm])


    return (
        <div>
            <h3>All Companies</h3>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {comps && comps.map((company)=>(
                <NavLink key = {company.handle} className="jobnav" to={`/companies/${company.handle}`}>
                <Card className="job" >
                    <CardHeader>
                    <h6>{company.name}</h6>
                    </CardHeader>
                    <CardBody>
                    {company.description}
                    </CardBody>
                </Card>
                </NavLink>
            ))}
            

        </div>
    )


}

export default Companies