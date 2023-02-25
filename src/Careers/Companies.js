import React, { useEffect, useState } from "react"
import JoblyApi from "../api"
import { Card, CardBody, CardHeader } from "reactstrap";
import { NavLink } from "react-router-dom";


function Companies() {

    const [searchTerm, setSearchTerm] = useState(null)
    const [comps, setComps] = useState(false)



    useEffect(()=>{
        async function getCompanies() {
            const companyList = await JoblyApi.getCompanies(searchTerm)
            console.log("companies",companyList.companies)
            return companyList.companies
        }
        getCompanies().then((res)=>{
            setComps(res);
        })
    },[])


    return (
        <div>
            <h3>All Companies</h3>
            {comps && comps.map((company)=>(
                <NavLink className="jobnav" exact to={`/companies/${company.handle}`}>
                <Card className="job" key = {company.handle}>
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