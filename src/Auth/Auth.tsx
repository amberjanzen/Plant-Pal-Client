import React, { Component } from "react";
import ReactDOM from "react-dom";
import  { UserLogin }   from "./UserLogin";
import { UserCreate } from "./UserCreate";


//toggle between user login and create
//create toggle?
type AcceptedProps = {
    updateToken: (arg0:string) => void
    
}
type AuthData = {

}

class Auth extends React.Component<AcceptedProps, AuthData> {
    constructor(props: AcceptedProps){
        super(props)
    }
    
        // constructor(props) {
        //     super(props);
        //     this.state = {isCreateOpen: true, isLoginOpen: false};
        // }
        // UserLoginForm() {
        //     this.setState({isLoginOpen: true, isCreateOpen: false})
        // }
        // UserCreateForm() {
        //     this.setState({isCreateOpen: true, isLoginOpen: false})
        // }
    render() {
        return (
            <div className="main">
                <div className= "mainDiv">
                     {/* <div className= "loginLogout" onClick={this.UserLoginForm.bind(this)}>
                         SignUp
                    </div>
                    <div className ="loginLogout" onClick={this.UserCreateForm.bind(this)}>
                        login
                    </div> */}
               <UserCreate updateToken={this.props.updateToken}/>
               <UserLogin updateToken={this.props.updateToken}/>
                </div>
                {/* <div className="box-container"> */}
                    {/* {this.state.isCreateOpen : <UserCreate/>}
                    {this.state.isLoginOpen : <UserLogin/>} */}
                {/* </div> */}

                <br />


            </div>
        )
    }
}
export default Auth;