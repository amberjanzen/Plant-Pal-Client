import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EditOutlined } from "@material-ui/icons";

//update location modal onclick
// map over location array?

interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}


type EditLocationProps = {
  sessionData: { authenticated: boolean; token: string | null };
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
    };
    // this.handleChange = this.handleChange.bind(this);
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
  };
  
  componentDidMount() {
     this.setState(this.props.location)
  }
  
  // fetchLocations = () => {
  //   fetch(`http://localhost:4000/location/`, {
  //     method: "GET",
  //     headers: new Headers(this.headers),
  //   })
  //   .then(res =>res.json())
  //   .then((data) => {
  //     console.log(data)
  //     this.setState({locationData: data.data})
  //   })
  //   .catch((err) => console.log(err));
  //   // .catch((err) => console.log(err));
  // }
  // componentDidUpdate() {
  // }
  
  handleSubmit = ( locationId: number ) => {
    if (this.props.sessionData !== undefined) {
      fetch(`http://localhost:4000/location/update/${locationId}`, {
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

  // handleChange = (e: any) => {
  //   console.log('any')
  //   e.preventDefault();
  //   const { name, value} = e.target;
  //   this.setState({...this.state, [name]: value });
  // };
  
  
  
  render() {
    // {const handleSubmit={this.handleSubmit}}
    return (
      <div>
        
        <Button color="secondary" onClick={this.handleClickOpen}>
          <EditOutlined />
        </Button>
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
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button 
            value={this.state.locationId}
            onClick= {(e) =>{
              this.handleSubmit(this.state.locationId) 
            }} color="primary">
              Submit Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
;

export default LocationEdit;
