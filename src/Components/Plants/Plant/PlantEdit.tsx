import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import APIURL from "../../../helpers/environment";

//update location modal onclick


interface plantInv {
  plantName: string;
  plantType: string;
  sunRequirement: string;
  waterNeeds: string;
  plantCare: string;
  locationId: number;
  plantId: number;
}

type EditPlantProps = {
  sessionData: { authenticated: boolean; token: string | null };
  plant: plantInv;
};

type plantEditState = {
  plantData: plantInv[];
  plantName: string;
  plantType: string;
  sunRequirement: string;
  waterNeeds: string;
  plantCare: string;
  locationId: number;
  type: string;
  open: boolean;
  plantId: number;
  submitted: boolean;
};

class PlantEdit extends Component<EditPlantProps, plantEditState> {
  constructor(props: EditPlantProps) {
    super(props);
    this.state = {
      open: false,
      plantName: "",
      type: "",
      plantId: 0,
      plantType: "",
      sunRequirement: "",
      waterNeeds: "",
      locationId: 0,
      plantCare: "",
      plantData: [],
      submitted: false,
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleClickOpen = () => {
    console.log(this.state);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  submitClick = (plantId: number) => {
    this.handleClose();
    this.handleSubmit(plantId);
    this.handleDelete();
  };

  componentDidMount() {
    this.setState(this.props.plant);
  }

  handleSubmit = (plantId: number) => {
    if (this.props.sessionData !== undefined) {
      fetch(`http://localhost:4000/plant/update/${plantId}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({
          plant: {
            // plantId: this.state.plantId,
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            sunRequirement: this.state.sunRequirement,
            waterNeeds: this.state.waterNeeds,
            plantCare: this.state.plantCare,
          },
        }),
      })
        .then((response) => {
          if (response.ok === true) {
            this.setState({ submitted: true });
            return response.json().then((plantId) => {
              console.log(`plant updated.`);
              console.log("updatedData:", plantId);
              this.handleClose();
              window.location.reload();
            });
          } else {
            console.log("plant not updated.");
          }
        })
        .catch((error: Error) => console.log(error));
    } else {
      console.log("plant not updated.");
    }
  };

  handleDelete = (): any => {
    if (this.props.sessionData !== undefined) {
      fetch(`${APIURL}/plant/${this.props.plant.plantId}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((response) => {
          console.log(response.ok);
          if (response.ok === true) {
            console.log(
              `Destination with the id ${this.props.plant.plantId} deleted.`
            );
            this.handleClose();
            window.location.reload();
          } else {
            console.log("Destination not deleted.");
          }
        })
        .catch((error: Error) => console.log(error));
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClickOpen}>
          Update Plant
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
                label="plantName"
                variant="outlined"
                type="text"
                name="plantName"
                value={this.state.plantName}
                onChange={(e) => {
                  this.setState({ plantName: e.target.value });
                }}
              />
              <br />
              <TextField
                label="Description"
                variant="outlined"
                type="text"
                name="plantType"
                value={this.state.plantType}
                onChange={(e) => {
                  this.setState({ plantType: e.target.value });
                }}
              />
              <br />
              <TextField
                label="Sun Requirement"
                variant="outlined"
                type="text"
                name="sunRequirement"
                value={this.state.sunRequirement}
                onChange={(e) => {
                  this.setState({ sunRequirement: e.target.value });
                }}
              />
              <br />
              <TextField
                label="Water Needs"
                variant="outlined"
                type="text"
                name="waterNeeds"
                value={this.state.waterNeeds}
                onChange={(e) => {
                  this.setState({ waterNeeds: e.target.value });
                }}
              />
              <br />
              <TextField
                label="Plant Care"
                variant="outlined"
                type="text"
                name="plantCare"
                value={this.state.plantCare}
                onChange={(e) => {
                  this.setState({ plantCare: e.target.value });
                }}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              value={this.state.plantId}
              onClick={(e) => {
                this.handleSubmit(this.state.plantId);
              }}
            >
              Submit Changes
            </Button>
            <Button onClick={this.handleDelete}>delete plant</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PlantEdit;
