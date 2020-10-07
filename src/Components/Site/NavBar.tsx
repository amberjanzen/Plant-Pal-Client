import React, { Component, useState } from "react";
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home';
import Auth from "../../Auth/Auth";
import UserTable from "../../Auth/userTable/UserTable";
import PlantIndex from "../Plants/PlantIndex";
import Resources from "./Resources";
import "../../StyleCSS/Header.css"

// import styled from "styled-components";

type navState= {

}
type NavProps = {
    updateToken: (token: string, authenticated: boolean) => void;
    sessionData: { authenticated: boolean, token: string | null }
}



class NavBar extends Component <NavProps, navState>  {
    constructor(props: NavProps) {
        super(props);
    }
    
    render() {
        // const [open, setOpen] = useState(false);

        return (

            <div className = "navbar">
                <nav>
                    <div className="logo">Plant Pal</div>
                    <ul className = "nav-links" >
                      <li><Link to ="/Auth">Home</Link></li>
                      <li><Link to ="/UserTable"> User Home</Link></li>
                      <li><Link to ="/PlantIndex">PlantIndex</Link></li>
                      <li><Link to ="/Resources">Resources</Link></li>
                    </ul>
                    <i  className="fas fa-bars burger"></i>
                    {/* <i onClick={()=> setOpen(!open)} className="fas fa-bars burger"></i> */}
                </nav>


                <div className = "navbar-route">
                <Switch>
                    <Route exact path="/auth"><Auth updateToken={this.props.updateToken} /></Route>
                    <Route exact path="/UserTable"><UserTable updateToken={this.props.updateToken} /></Route>
                    <Route exact path="/plantIndex"><PlantIndex sessionData={this.props.sessionData} /></Route>
                    <Route exact path="/Resources"><Resources /></Route>
                </Switch>
                </div>
            </div>
        )
    }
}
export default NavBar;