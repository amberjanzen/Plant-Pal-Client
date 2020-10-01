
import React, { Component } from "react";
import  { UserLogin }   from "./UserLogin";
import { UserCreate } from "./UserCreate";


//toggle between user login and create
//create toggle?

class Auth extends Component {

    render() {
        return (
            <div>
                <UserLogin />
                <br />
                <UserCreate />

            </div>
        )
    }
}
export default Auth;