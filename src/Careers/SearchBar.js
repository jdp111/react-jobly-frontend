import { Card, CardBody, CardHeader } from "reactstrap";


function SearchBar({searchTerm, setSearchTerm}) {

    // handles search term change on submit
    const handleChange = (evt)=>{
        const {name, value} = evt.target
        setSearchTerm(value)
    }

    const handleSubmit = (evt)=>{
        evt.preventDefault()
    }



    return(
        <div className="search-box form-outline">
            <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="search" >Search:</label>
                <input className="form-control" onChange={handleChange} name= "search" value = {searchTerm} type="text" placeholder="search anything!"></input>
            </form>

        </div>
    )

}

export default SearchBar