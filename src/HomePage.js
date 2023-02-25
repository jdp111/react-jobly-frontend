import React from "react";
import { NavLink} from "react-router-dom";

function HomePage({username}) {
    return(
    <div>
        {username
            ? <h3>Welcome to Jobly, {username}!</h3>
            :   <div>
                    <h3> Welcome to Jobly!</h3>
                    <p> Log in or register to view jobs and companies</p>
                    <NavLink to="/login">
                        <button className="btn btn-secondary btn-lg">Login</button>
                    </NavLink>

                    <NavLink to="/register">
                        <button className="btn btn-primary btn-lg">Register</button>
                    </NavLink>
                </div>
        }
    </div>
    )
}

export default HomePage