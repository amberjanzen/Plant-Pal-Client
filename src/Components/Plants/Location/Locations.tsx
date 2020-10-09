
import React, { Component } from "react";
import { Table, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// does not fetch
// need to query Userid? 




type getLocationProps = {
  sessionData: { authenticated: boolean, token: string | null },
}
export interface locationState {
    location: results[]
}
type locationInv = {
    locationId: number;
    locationName:string;
    locationDescription: string;
    plantCare: string;
    };
  
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
        this.state = {
         location: [],
         
        }
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


componentDidMount() {
this.fetchLocations()
}
componentDidUpdate() {
    console.log(this.state);
}

  fetchLocations = () => {
    fetch(`http://localhost:4000/location`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((data) => this.setState(data))
      // console.log(data)) 
      .catch(err => console.log(err))
  }

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

// export interface locationState {
//     location: results[]
// }
// const { location } = this.state

// {location.map(location => (
//     <div key={location}>
//         {this.state.location.locationName} </div>
// ))}
//   componentDidMount()
//  {
//     fetch(`http://localhost:4000/location/`, {
//               method: "GET",
//               headers: this.headers,
//             })
//               .then(response => response.json())
//               .then(response => {this.setState({
//                   location: response.results,
//                 }, () => console.log(this.state))
//             })
//               .catch(error => console.log(error))
//           }