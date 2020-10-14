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
    locationName: string,
    type: string;
    open: boolean;
    id: number;
};


class PlantEdit extends Component<EditPlantProps, plantEditState> {
  constructor(props: EditPlantProps) {
    super(props);
    this.state = {
      open: false,
      plantName: "",
      id: 0,
      plantType: "",
      sunRequirement: "",
      locationName: "",
      waterNeeds: "",
      plantCare: "",
      type: "",
      plantData: [],
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

  submitClick = () => {
    this.handleClose();
    this.handleSubmit();
  };

  // componentDidMount() {
  //    this.setState(plantInv)
  // }


  handleSubmit = () => {
    if (this.props.sessionData !== undefined) {
      fetch(`http://localhost:4000/plant/update/${this.props.plant.plantId}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({
          plant: {
            // plantId: this.state.plantId,
            [this.props.plant.plantName]: this.state.plantName,
            plantType: this.state.plantType,
            sunRequirement: this.state.sunRequirement,
            waterNeeds: this.state.waterNeeds,
            plantCare: this.state.plantCare,
          },
        }),
      })
      .then(response => {
        if (response.ok === true) {
          return response.json()
          .then(id=> {
            console.log(`plant updated.`)
            console.log('updatedData:', id)
            this.handleClose();
          })
        } else {
          console.log('plant not updated.')
        }
      })
      .catch((error: Error) => console.log(error))
    } 
    else {
      console.log('plant not updated.')
    }
  };
//  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ type: event.target.value });
//   };
// handleChange = (e: any) => {
//   e.preventDefault();
//   const { name, value} = e.target;
//   this.setState(Object.assign(this.state, { [name]: value }));
// };
  
  
  render() {
  
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
                label="plantName"
                variant="outlined"
                type="text"
                name= "plantName"
                value={this.props.plant.plantName}
                onChange={(e) => {
                  this.setState({ plantName: e.target.value });
                }}
                />
              <br />
              <TextField
                label="Description"
                variant="outlined"
                type="text"
                name= "plantType"
                value={this.props.plant.plantType}
                onChange={(e) => {
                  this.setState({ plantType: e.target.value });
                }}
                />
              <br />
              <TextField
                label="Sun Requirement"
                variant="outlined"
                type="text"
                name= "sunRequirement"
                value={this.props.plant.sunRequirement}
                onChange={(e) => {
                  this.setState({ sunRequirement: e.target.value });
                }}
                />
               <br />
              <TextField
                label="Water Needs"
                variant="outlined"
                type="text"
                name= "waterNeeds"
                value={this.props.plant.waterNeeds}
                onChange={(e) => {
                  this.setState({ waterNeeds: e.target.value });
                }}
                />
               <br />
              <TextField
                label="Plant Care"
                variant="outlined"
                type="text"
                name= "plantCare"
                value={this.props.plant.plantCare}
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
            value={this.props.plant.plantId}
            onClick= {this.handleSubmit} color="primary">
              Submit Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default PlantEdit;

