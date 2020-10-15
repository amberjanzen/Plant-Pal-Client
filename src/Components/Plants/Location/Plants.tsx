import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { FormControl, TextField, Button,  Container} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import PlantEdit from "../Plant/PlantEdit";
import { makeStyles, createStyles, Theme  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import LocationEdit from "./LocationEdit";
// import PlantCreate from "../Plant/PlantCreate";
import APIURL from "../../../helpers/environment";
import plant from "../../../Assets/plant.png";

interface plantProps {
  sessionData: { authenticated: boolean, token: string | null },

  }

  interface editPlantProps {
    sessionData: { authenticated: boolean, token: string | null },
    plant: plantInv,
    location: locationInv,
  }


interface plantInv {
    id: 0;
    plantName: string;
    plantType: string;
    sunRequirement: string;
    waterNeeds: string;
    plantCare: string;
    locationId: number,
    plantId: number,
    locationName: string,
  }
  interface locationInv {
    locationId: number;
    locationName: string;
    locationDescription: string;
    sunExposure: string;
  }
  
  //   interface Plant {
    //     plant: plantInv;
    //   }
    export interface plantState {
      plantData: plantInv[],
      locationData: locationInv[];
      

  }

  const styles = {
    table: {
      minWidth: 650,
    },
  };

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

class Plant extends Component<plantProps, plantState> {
    constructor(props: editPlantProps) {
        super(props);
        console.log(props);
        this.state = {
            plantData: [],
            locationData: [],

        };
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
        fetch(` ${APIURL}/plant/myplants`, {
            method: 'GET',
            headers: new Headers(this.headers),
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ plantData: data.data })
            })

            .catch(err => console.log(err))
    }
    plantInvMap = () => {
        console.log(this.state.plantData);
        return this.state.plantData.map((plant: plantInv, index) => {
          return (
            <TableRow key={index}>
            <TableCell align="right">{plant.plantName}</TableCell>
            <TableCell align="right">{plant.plantType}</TableCell>
            <TableCell align="right">{plant.sunRequirement}</TableCell>
            <TableCell align="right">{plant.plantType}</TableCell>
            <TableCell align="right">{plant.plantCare}</TableCell> 
            <Button type="submit" variant="contained" color="primary">
            <PlantEdit sessionData={this.props.sessionData} plant={plant}/> 
            </Button>  
            </TableRow>
          );
        });
      };

      plantInvMapTest = () => {
        console.log(this.state.plantData);
        return this.state.plantData.map((plant: plantInv, index) => {
          return (
            <div>

            <Card>
            <CardActionArea key = {index}>
            <CardMedia>
              
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
               {plant.plantName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {plant.plantType}
              <br />
              {plant.sunRequirement}
              <br />
              {plant.waterNeeds}
              <br />
              {plant.plantCare}
              </Typography>
            </CardContent>
            <CardActions>
            {/* <button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button> */}
            <button type="submit">
            <PlantEdit sessionData={this.props.sessionData} plant={plant}/> 
            </button>  
          </CardActions>
          </CardActionArea>
          </Card>
          <br />
            </div>


          );
        });
      };
      
    render() {

        return (
            <div>
                 <Container>
                 <h2>My Plants</h2>
               <Grid container spacing={9}>
               <Grid item xs={4}>
               {/* <CardMedia>
              <img src= {plant}/>
            </CardMedia> */}

            {this.plantInvMapTest()}
                </Grid>
               </Grid>



        {/* {this.plantInvMapTest()} */}
                 </Container>
            </div>
        )
    }
}
export default Plant;