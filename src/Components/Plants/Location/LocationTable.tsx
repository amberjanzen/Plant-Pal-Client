import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import LocationCreate from "./LocationCreate";
import Locations from "./Locations";


//displays locations

type LocationIndexProps = {
  sessionData: { authenticated: boolean; token: string | null };
};

class PlantTable extends Component<LocationIndexProps> {
  constructor(props: LocationIndexProps) {
    super(props);
    console.log(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Locations sessionData={this.props.sessionData} />
          </Grid>
          <Grid item xs={12}>
            <LocationCreate sessionData={this.props.sessionData} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default PlantTable;
