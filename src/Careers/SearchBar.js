import { useState } from "react"
import Companies from "./Companies"



function Postings() {

    const [searchTerm, setSearchTerm] = useState(null)

    return(
        <div>
            <form>
                <input></input>
            </form>

            <Companies searchTerm = {searchTerm}/>
        </div>
    )

}

export default Postings