import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import {List, ListItem, Link, ListItemText, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// does not fetch
// need to query Userid? 




type getLocationProps = {
  sessionData: { authenticated: boolean, token: string | null },
}
export interface locationState {
    location: results[]
}
type locationInv = {
    location: {
    locationId: number;
    locationName:string;
    locationDescription: string;
    plantCare: string;
    };
  }
// interface getLocations {
//     locationName: string,
//     locationDescription: string,
//     sunExposure: string,
// }
type results = {
    [index: number]: locationInv
}

class Locations extends React.Component <getLocationProps, locationState> {
    constructor(props: getLocationProps){
        super(props)
        console.log(props);
    }
state = {
    location: []
    // loading: true,
    // error: false, 
}

  headers: any = {
    "Content-Type": "application/json",
    'Authorization': this.props.sessionData.token,
  };

  componentDidMount()
 {
    fetch(`http://localhost:4000/location/`, {
              method: "GET",
              headers: this.headers,
            })
              .then(response => response.json())
              .then(response => {this.setState({
                  location: response.results,
                }, () => console.log(this.state))
            })
              .catch(error => console.log(error))
          }


// componentDidMount() {
// this.fetchLocations()
// }
// componentDidUpdate() {
//     console.log(this.state);
// }

//   fetchLocations = () => {
//     fetch(`http://localhost:4000/location`, {
//       method: "GET",
//       headers: this.headers,
//     })
//       .then((res) => res.json())
//       .then((data) =>
//       console.log(data))
//       .catch(err => console.log(err))
//   } 
// export interface locationState {
//     location: results[]
// }
// const { location } = this.state

// {location.map(location => (
//     <div key={location}>
//         {this.state.location.locationName} </div>
// ))}

    render() {
 

        return (
          <div>
              <h3>location</h3>
           
              
                  <p className="location">{`location: ${this.state.location}`}</p>
            
            
          </div>
        );
}
}

export default Locations;