import React, { Component } from "react";
import ReactDOM from "react-dom";
import  { UserLogin }   from "./UserLogin";
import { UserCreate } from "./UserCreate";
// import { Link, Route, Switch} from "react-router-dom";

//create router to toggle between login and logout


//toggle between user login and create
//create toggle?
type AcceptedProps = {
    updateToken: (token:string, authenticated: boolean) => void
    
}


class Auth extends React.Component<AcceptedProps> {
    // constructor(props: AcceptedProps){
    //     super(props);
    //     this.toggle =this.toggle.bind(this);
    //     this.state ={
    //         isOpen: true,
    //     }
    // }
    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }
    
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
                  <div className="container">
                     {/* {<UserLogin updateToken={this.props.updateToken}/>} */}
                  </div>

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