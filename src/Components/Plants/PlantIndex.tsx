import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";

import LocationTable from "./Location/LocationTable";
import PlantTable from "./Plant/PlantTable";

type PlantIndexProps = {
  sessionData: { authenticated: boolean; token: string | null };
};

//not in use
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

class PlantIndex extends Component<PlantIndexProps> {
  constructor(props: PlantIndexProps) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <LocationTable sessionData={this.props.sessionData} />
        </Grid>
        <Grid item xs={9}>
          <PlantTable sessionData={this.props.sessionData} />
        </Grid>
      </Grid>
    );
  }
}
export default PlantIndex;
