
import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';


// does not fetch
// need to query Userid? 




type getLocationProps = {
  sessionData: { authenticated: boolean, token: string | null },
}
// interface Iheaders ={
//     Content-Type: string,
//     Authorization: string,
// }
interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}

interface Location {
  location: locationInv;
}
export interface locationState {
locationData: locationInv[]
}
const styles = {
  table: {
    minWidth: 650,
  },
};


class Locations extends React.Component <getLocationProps, locationState> {
    constructor(props: getLocationProps){
        super(props)
        console.log(props);
        this.state = {
         locationData: [],
        };
      }

  headers: any = {
    "Content-Type": "application/json",
    "Authorization": this.props.sessionData.token,
  };

  
  componentDidMount() {
  this.fetchLocations()
  }
  componentDidUpdate() {
  }
  
  fetchLocations = () => {
    fetch(`http://localhost:4000/location`, {
      method: "GET",
      headers: new Headers(this.headers),
    })
    .then(res =>res.json())
    .then((data) => {
    console.log(data)
    this.setState({locationData: data.data})
  })
    .catch((err) => console.log(err));
    // .catch((err) => console.log(err));
  }




locationInvMap = () => {
  console.log(this.state.locationData);
  return this.state.locationData.map((location: locationInv, index) => {
    return (
      <TableRow key={index}>
      <TableCell component="th" scope="row"> {location.locationId} </TableCell>
      <TableCell align="right">{location.locationName}</TableCell>
      <TableCell align="right">{location.locationDescription}</TableCell>
      <TableCell align="right">{location.sunExposure}</TableCell>
      
      </TableRow>

    );
  });
};




  render() {
    return (
      <div>
        <h3>Location Table</h3>
        <TableContainer component={Paper}>
            <Table style={styles.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'>Location Name</TableCell>
                        <TableCell align='right'>location Description</TableCell>
                        <TableCell align='right'>Lighting </TableCell>                             
                    </TableRow>
                </TableHead>
                <TableBody>
                {this.locationInvMap()}
               
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    );
  }
}


    export default Locations;
