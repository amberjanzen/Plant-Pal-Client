import React, { Component } from "react";
// import LocationEdit from "./LocationEdit";
// import PlantCreate from "../Plant/PlantCreate";
// import Plants from "./Plants";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
// import Radium from 'radium';
import { Link } from "react-router-dom";
import APIURL from "../../helpers/environment";

// does not fetch
// need to query Userid?

interface adminLocProps {
  sessionData: { authenticated: boolean; token: string | null };

}
interface locationProps {
    sessionData: { authenticated: boolean; token: string | null };
    location: locationInv;
  }

// type getLocationProps = {
//   sessionData: { authenticated: boolean; token: string | null };
// };
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
  locationData: locationInv[];
}
const styles = {
  table: {
    minWidth: 650,
  },
};

class AdminLocation extends React.Component<adminLocProps, locationState> {
  constructor(props: locationProps) {
    super(props);
    console.log(props);
    this.state = {
      locationData: [],
    };
  }

  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  componentDidMount() {
    this.fetchLocations();
  }
  componentDidUpdate() {}

  fetchLocations = () => {
    fetch(`${APIURL}/location/admin/all`, {
      method: "GET",
      headers: new Headers(this.headers),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ locationData: data.data });
      })
      .catch((err) => console.log(err));
    // .catch((err) => console.log(err));
  };

  locationInvMapTest = () => {
    console.log(this.state.locationData);
    return this.state.locationData.map((location: locationInv, index) => {
      return (
        <div>
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> {location.locationName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{location.locationDescription}</Typography>
              <Typography>{location.sunExposure}</Typography>
            </AccordionDetails>
            {/* <div>
              <LocationEdit
                sessionData={this.props.sessionData}
                location={location}
              />

              <PlantCreate
                sessionData={this.props.sessionData}
                location={location}
              />
              <br />
            </div> */}
          </Accordion>
          <br />
        </div>
      );
    });
  };



  render() {
    return (
      <Container>
        {this.locationInvMapTest()}
      </Container>
    );
  }
}

export default AdminLocation;