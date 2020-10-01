import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom'
import Home from './Home';
import PlantIndex from "../Plants/PlantIndex";
import Resources from "./Resources";




class NavBar extends Component {


    render() {
        return (

            <div className = "navbar">
                <div className = "navbar-list-styling">
                    <ul className = "nav-unstyled">
                      <li><Link to ="/home">Home</Link></li>
                      <li><Link to ="/PlantIndex">PlantIndex</Link></li>
                      <li><Link to ="/Resources">Resources</Link></li>
                    </ul>
                </div>


                <div className = "navbar-route">
                <Switch>
                    <Route exact path="/home"><Home /></Route>
                    <Route exact path="/plantindex"><PlantIndex /></Route>
                    <Route exact path="/Resources"><Resources /></Route>
                </Switch>
                </div>
            </div>
        )
    }
}
export default NavBar;