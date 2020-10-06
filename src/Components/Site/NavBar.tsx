import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home';
import Auth from "../../Auth/Auth";
import PlantIndex from "../Plants/PlantIndex";
import Resources from "./Resources";

type navState= {

}
type NavProps = {
    updateToken: (token: string, authToken: boolean) => void;
    sessionData: { authenticated: boolean, token: string | null }
}



class NavBar extends Component <NavProps, navState>  {
    constructor(props: NavProps) {
        super(props);
    }

    render() {
        return (

            <div className = "navbar">
                <div className = "navbar-list-styling">
                    <ul className = "nav-unstyled">
                      <li><Link to ="/Auth">Home</Link></li>
                      <li><Link to ="/PlantIndex">PlantIndex</Link></li>
                      <li><Link to ="/Resources">Resources</Link></li>
                    </ul>
                </div>


                <div className = "navbar-route">
                <Switch>
                    <Route exact path="/auth"><Auth updateToken={this.props.updateToken} /></Route>
                    <Route exact path="/plantIndex"><PlantIndex sessionData={this.props.sessionData} /></Route>
                    <Route exact path="/Resources"><Resources /></Route>
                </Switch>
                </div>
            </div>
        )
    }
}
export default NavBar;