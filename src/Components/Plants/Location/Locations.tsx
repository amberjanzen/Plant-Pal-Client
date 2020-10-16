import React from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";

import LocationEdit from "./LocationEdit";
import PlantCreate from "../Plant/PlantCreate";
import APIURL from "../../../helpers/environment";

//maps user location fetch with -render delete and update button components //

// --- previous table map kept, but commented out for future ref //

interface locationProps {
  sessionData: { authenticated: boolean; token: string | null };
  location: locationInv;
}

type getLocationProps = {
  sessionData: { authenticated: boolean; token: string | null };
};

interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}

export interface locationState {
  locationData: locationInv[];
}
const styles = {
  table: {
    minWidth: 650,
  },
};

class Locations extends React.Component<getLocationProps, locationState> {
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
    fetch(`${APIURL}/location`, {
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
            <div>
              <LocationEdit
                sessionData={this.props.sessionData}
                location={location}
              />

              <PlantCreate
                sessionData={this.props.sessionData}
                location={location}
              />
              <br />
            </div>
          </Accordion>
          <br />
        </div>
      );
    });
  };

  // locationInvMap = () => {
  //   console.log(this.state.locationData);
  //   return this.state.locationData.map((location: locationInv, index) => {
  //     return (
  //       <TableRow key={index}>
  //       {/* <TableCell component="th" scope="row"> {location.locationId} </TableCell> */}
  //       <TableCell align="right">{location.locationName}</TableCell>
  //       <TableCell align="right">{location.locationDescription}</TableCell>
  //       <TableCell align="right">{location.sunExposure}</TableCell>
  //             <Button type="submit" variant="contained" color="primary">
  //             <LocationEdit sessionData={this.props.sessionData} location={location}/>
  //             </Button>
  //             <Button type="submit" variant="contained" color="primary">
  //             <PlantCreate sessionData={this.props.sessionData} location={location} />
  //             </Button>

  //       </TableRow>
  //     );
  //   });
  // };

  render() {
    return (
      <Container>
        <h2>Plant Locations</h2>
        {this.locationInvMapTest()}
        {/* <h3>Location Table</h3>
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
        </TableContainer> */}
      </Container>
    );
  }
}

export default Locations;
