import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import APIURL from "../../../helpers/environment";

//update and delete locations

interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}


type EditLocationProps = {
  sessionData: { authenticated: boolean, token: string | null },
  location: locationInv
};

type LocationEditState = {
  locationData: locationInv[];
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
  type: string;
  open: boolean;
  submitted: boolean;
};
class LocationEdit extends Component<EditLocationProps, LocationEditState> {
  constructor(props: EditLocationProps) {
    super(props);
    this.state = {
      open: false,
      type: "",
      locationId: 0,
      locationName: "",
      locationDescription: "",
      sunExposure: "",
      locationData: [],
      submitted: false,
    };
 
  }


handleClickOpen = () => {
  console.log(this.state)
  this.setState({ open: true });
};

handleClose = () => {
  this.setState({ open: false });
};


  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  submitClick = (locationId: number) => {
    this.handleClose();
    this.handleSubmit(locationId);
    this.handleDelete();
  };

  componentDidMount() {
     this.setState(this.props.location)
  }

  handleSubmit = ( locationId: number ) => {
    if (this.props.sessionData !== undefined) {
      fetch(`${APIURL}/location/update/${locationId}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({
          location: {
            // locationId: this.state.locationId,
            locationName: this.state.locationName,
            locationDescription: this.state.locationDescription,
            sunExposure: this.state.sunExposure,
          },
        }),
      })
      .then(response => {
        if (response.ok === true) {
          this.setState({submitted:true})
          return response.json()
          .then(locationId=> {
            console.log(`location at id ${locationId} updated.`)
            console.log('updatedData:', locationId)
            this.handleClose();
          })
        } else {
          console.log('location not updated.')
        }
      })
      .catch((error: Error) => console.log(error))
    }
    else {
      console.log('Destination not updated.')
    }
  };
  handleDelete = (): any => {
    if (this.props.sessionData !== undefined) {
        fetch(`${APIURL}/location/${this.props.location.locationId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(response => {
                console.log(response.ok)
                if (response.ok === true) {
                    console.log(`location deleted.`)
                    this.handleClose()
                    window.location.reload()
                } else {
                    console.log('could not delete location.')
                }
            })
            .catch((error: Error) => console.log(error))
    }
}



  
  
  render() {

    return (
      <div>
        <button onClick={this.handleClickOpen}>
          Edit location
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
                label="Location"
                variant="outlined"
                type="text"
                name= "location"
                value={this.state.locationName}
                onChange={(e) => {
                  this.setState({ locationName: e.target.value });
                }}
                />
              <br />
              <TextField
                label="Description"
                variant="outlined"
                type="text"
                name= "description"
                value={this.state.locationDescription}
                onChange={(e) => {
                  this.setState({ locationDescription: e.target.value });
                }}
                />
              <br />
              <TextField
                label="Sun Exposure"
                variant="outlined"
                type="text"
                name= "sun exposure"
                value={this.state.sunExposure}
                onChange={(e) => {
                  this.setState({ sunExposure: e.target.value });
                }}
                />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button 
            value={this.state.locationId}
            onClick= {(e) =>{
              this.handleSubmit(this.state.locationId) 
            }} >
              Submit Changes
            </Button>
            <Button 
            onClick= {this.handleDelete} >
              delete location
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
;

export default LocationEdit;
