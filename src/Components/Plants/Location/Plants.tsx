import React, { Component } from "react";

import { Grid, Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import PlantEdit from "../Plant/PlantEdit";
import APIURL from "../../../helpers/environment";

// Displays all user plants.
//to do: add in images, create 3 row grid, and sort by locations

interface plantProps {
  sessionData: { authenticated: boolean; token: string | null };
}

interface editPlantProps {
  sessionData: { authenticated: boolean; token: string | null };
  plant: plantInv;
  // location: locationInv;
}

interface plantInv {
  id: 0;
  plantName: string;
  plantType: string;
  sunRequirement: string;
  waterNeeds: string;
  plantCare: string;
  locationId: number;
  plantId: number;
  locationName: string;
}
// interface locationInv {
//   locationId: number;
//   locationName: string;
//   locationDescription: string;
//   sunExposure: string;
// }

export interface plantState {
  plantData: plantInv[];
  // locationData: locationInv[];
}

class Plant extends Component<plantProps, plantState> {
  constructor(props: editPlantProps) {
    super(props);
    console.log(props);
    this.state = {
      plantData: [],
      // locationData: [],
    };
  }

  headers: any = {
    "Content-Type": "application/json",
    'Authorization': this.props.sessionData.token,
  };

  componentDidMount() {
    this.itemsFetch();
  }
  componentDidUpdate() {

  }
  itemsFetch = () => {
    fetch(`${APIURL}/plant/myplants`, {
      method: "GET",
      headers: new Headers(this.headers),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ plantData: data.data });
      })

      .catch((err) => console.log(err));
  };

  plantInvMap = () => {
    console.log(this.state.plantData);
    return this.state.plantData.map((plant: plantInv, index) => {
      return (
        <div>
          <Card>
            <CardActionArea key={index}>
              <CardMedia></CardMedia>
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
                  <PlantEdit sessionData={this.props.sessionData} plant={plant}/>
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
          <div>
            <br />
          <Grid container spacing={3}>
            <br />
            <Grid item xs={5}>
              {/* <CardMedia>
              <img src= {plant}/>
            </CardMedia> */}
              {this.plantInvMap()}
            </Grid>
          </Grid>
          </div>
        </Container>
      </div>
    );
  }
}
export default Plant;
