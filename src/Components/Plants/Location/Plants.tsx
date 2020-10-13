import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
// import LocationEdit from "./LocationEdit";
// import PlantCreate from "../Plant/PlantCreate";


interface plantProps {
    sessionData: { authenticated: boolean, token: string | null},
  }


interface plantInv {
    plantName: string;
    plantType: string;
    sunRequirement: string;
    waterNeeds: string;
    plantCare: string;
    locationId: number, 
  }


//   interface Plant {
//     plant: plantInv;
//   }
  export interface plantState {
  plantData: plantInv[],


  }

  const styles = {
    table: {
      minWidth: 650,
    },
  };
  
class Plant extends Component<plantProps, plantState> {
 state = {
     plantData: []
 }

    headers: any = {
        "Content-Type": "application/json",
        Authorization: this.props.sessionData.token,
      };
      
    componentDidMount() {
        this.itemsFetch();
        
    }
    componentDidUpdate() {
    }
    itemsFetch = ()  => {
        fetch(` http://localhost:4000/plant/myplants`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ plantData: data.data })
            })

            .catch(err => console.log(err))
    }
    locationInvMap = () => {
        console.log(this.state.plantData);
        return this.state.plantData.map((plant: plantInv, index) => {
          return (
            <TableRow key={index}>
            <TableCell component="th" scope="row"> {plant.locationId} </TableCell>
            <TableCell align="right">{plant.plantName}</TableCell>
            <TableCell align="right">{plant.plantType}</TableCell>
            <TableCell align="right">{plant.sunRequirement}</TableCell>
            <TableCell align="right">{plant.waterNeeds}</TableCell>
            <TableCell align="right">{plant.plantCare}</TableCell>    
            </TableRow>
          );
        });
      };
      
    render() {

        return (
            <div>
                 <h3>plant table</h3>
        <TableContainer component={Paper}>
            <Table style={styles.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'>Plant Name</TableCell>
                        <TableCell align='right'>Plant Type</TableCell>
                        <TableCell align='right'>Sun Requirement </TableCell>
                        <TableCell align='right'>water needs </TableCell> 
                        <TableCell align='right'>plant care </TableCell>                              
                    </TableRow>
                </TableHead>
                <TableBody>
                {this.locationInvMap()}
                
                
               
                </TableBody>
       
            </Table>
        </TableContainer>
            </div>
        )
    }
}
export default Plant;