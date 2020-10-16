import React, { Component } from "react";

import { FormControl, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import APIURL from "../../../helpers/environment";
import "../../../StyleCSS/auth.css";

//Create new plants based off of locations- location props passed down from Locations//

//create drop down options for enums
// sunRequirement: {
//   type: DataTypes.ENUM("Full Sun", "Partial Sun/Shade", "Full Shade"),
//   allowNull: false,
// },
// waterNeeds: {
//   type: DataTypes.ENUM("Regularly", "Infrequently"),
//   allowNull: false,
// },

interface createPlant {
  locationData: locationInv[];
  plantName: string;
  plantType: string;
  sunRequirement: string;
  waterNeeds: string;
  plantCare: string;
  open: boolean;
}
type NewPlantProps = {
  sessionData: { authenticated: boolean; token: string | null };
  location: locationInv;
};
interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}

class PlantCreate extends Component<NewPlantProps, createPlant> {
  constructor(props: NewPlantProps) {
    super(props);
    this.state = {
      open: false,
      plantName: "",
      plantType: "",
      sunRequirement: "",
      waterNeeds: "",
      plantCare: "",
      locationData: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickOpen = () => {
    console.log(this.state);
    this.setState({ open: true });
  };
  submitClick = (locationId: number) => {
    this.handleClose();
    this.handleSubmit(locationId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(Object.assign(this.state, { [name]: value }));
  };

  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  fetchPlants = () => {
    fetch(`${APIURL}/plant/all`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((plant) => {
        console.log(plant);
      });
  };

  handleSubmit = (locationId: number) => {
    fetch(`${APIURL}/plant/${locationId}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        plant: {
          plantName: this.state.plantName,
          plantType: this.state.plantType,
          sunRequirement: this.state.sunRequirement,
          waterNeeds: this.state.waterNeeds,
          plantCare: this.state.plantCare,
        },
      }),
    })
      .then((res) => res.json())
      .then((locationName) => {
        console.log(`plant added to ${locationName}`);
        this.handleClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <button color="secondary" onClick={this.handleClickOpen}>
          Add Plant
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">update location</DialogTitle>
          <DialogContent>
            <FormControl>
              <TextField
                label="Plant Name"
                variant="outlined"
                type="string"
                name="plantName"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                label="Type"
                variant="outlined"
                type="string"
                name="plantType"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                label="Sun Requirements"
                variant="outlined"
                type="string"
                name="sunRequirement"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                label="Watering Frequency"
                variant="outlined"
                type="string"
                name="waterNeeds"
                onChange={this.handleChange}
              />
              <br />
              <TextField
                label="Notes"
                variant="outlined"
                type="string"
                name="plantCare"
                onChange={this.handleChange}
              />
              <br />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <button onClick={this.handleClose} color="secondary">
              Cancel
            </button>
            <button
              value={this.props.location.locationId}
              onClick={(e) => {
                this.handleSubmit(this.props.location.locationId);
              }}
              color="primary"
            >
              add plant
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PlantCreate;
