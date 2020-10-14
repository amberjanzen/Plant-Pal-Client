import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { EditOutlined } from "@material-ui/icons";

//sequelize database error "22P02"

// sunRequirement: {
//   type: DataTypes.ENUM("Full Sun", "Partial Sun/Shade", "Full Shade"),
//   allowNull: false,
// },
// waterNeeds: {
//   type: DataTypes.ENUM("Regularly", "Infrequently"),
//   allowNull: false,
// },
//need to add enum in
// connect to model
//session token not working?

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
  location: locationInv
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
  console.log(this.state)
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

  // token:string|null = this.props.SessionData.SessionData.token
  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  fetchPlants = () => {
    fetch(`http://localhost:4000/plant/all`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((plant) => {
        console.log(plant);
      });
  };

  // useEffect(() => {
  //   fetchMedia(localStorage.getItem("token"));
  // }, []);

  handleSubmit = (locationId: number) => {
    fetch(`http://localhost:4000/plant/${locationId}`, {
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
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };
  //   profileFetch = (values:Values) => {
  //     fetch(`http://localhost:4000/plant/create`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         plantName: values.plantName,
  //         plantType: values.plantType,
  //         sunRequirement: values.sunRequirement,
  //         waterNeeds: values.waterNeeds,
  //         plantCare: values.plantCare,

  //       }),
  //       }).then(res => res.json())
  //       .then((data) => {
  //           console.log(data)
  //       })

  //       .catch((err) => console.log(err));
  //   };

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
          <h2>Sign Up</h2>
            <div className="plantName">
              <label htmlFor="plantName">Name</label>
              <input
                type="string"
                name="plantName"
                onChange={this.handleChange}
              />
            </div>
            <div className="text">
              <label htmlFor="plantType">Type</label>
              <input
                type="string"
                name="plantType"
                onChange={this.handleChange}
              />
            </div>
            <div className="sunRequirement">
              <label htmlFor="sunRequirement">sun</label>
              <input
                type="string"
                name="sunRequirement"
                onChange={this.handleChange}
              />
            </div>
            <div className="waterNeeds">
              <label htmlFor="waterNeeds">water</label>
              <input
                type="string"
                name="waterNeeds"
                onChange={this.handleChange}
              />
            </div>
            <div className="plantCare">
              <label htmlFor="plantCare">care</label>
              <input
                type="string"
                name="plantCare"
                onChange={this.handleChange}
              />
            </div>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button 
            value={this.props.location.locationId}
            onClick= {(e) =>{
              this.handleSubmit(this.props.location.locationId) 
            }} color="primary">
              add plant
            </Button>
          </DialogActions>


          </Dialog>
        </div>

    );
  }
}
export default PlantCreate;
// render() {

//   return (
//       <div className="createTable">
//       <h1> Add New Plant</h1>
//       <FormControl>
//         <TextField
//           label="Plant Type"
//           variant="outlined"
//           type="text"
//           onChange={(e) => {
//             this.setState({ plantName: e.target.value });
//           }}
//         />
//           <br />
//         <TextField
//           label="Plant Name"
//           variant="outlined"
//           type="text"
//           onChange={(e) => {
//             this.setState({ plantType: e.target.value });
//           }}
//         />
//         <br />
//            <TextField
//           label="Sun Requirements"
//           variant="outlined"
//           type="text"
//           onChange={(e) => {
//             this.setState({ sunRequirement: e.target.value });
//           }}
//         />
//           <br />
//          <TextField
//           label="Water Needs"
//           variant="outlined"
//           type="text"
//           onChange={(e) => {
//             this.setState({ waterNeeds: e.target.value });
//           }}
//         />
//           <br />
//         <TextField
//           label="Plant Care"
//           variant="outlined"
//           type="text"
//           onChange={(e) => {
//             this.setState({ plantCare: e.target.value });
//           }}
//         />
//         <Button
//           variant="contained"
//           onClick={(e) => {
//             this.handleSubmit(e);
//           }}
//         >
//           Add to your inventory
//         </Button>
//       </FormControl>
//     </div>
//   )
// }
// }
// export default PlantCreate;
