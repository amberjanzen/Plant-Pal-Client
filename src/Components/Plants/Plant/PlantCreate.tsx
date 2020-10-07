import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";

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
  plant: {
    plantName: string;
    plantType: string;
    sunRequirement: string;
    waterNeeds: string;
    plantCare: string;
  };
}
type NewPlantProps = {
  sessionData: { authenticated: boolean, token: string | null };
};
class PlantCreate extends Component<NewPlantProps, createPlant> {
  handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(Object.assign(this.state, { [name]: value }));
  };
  constructor(props: NewPlantProps) {
    super(props);
    const initialState = {
      plant: {
        plantName: "",
        plantType: "",
        sunRequirement: "",
        waterNeeds: "",
        plantCare: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }
  // token:string|null = this.props.SessionData.SessionData.token
  requestHeaders: any = {
    "Content-Type": "application/json",
    'Authorization': this.props.sessionData.token,
  };

  fetchPlants = () => {
    fetch(`http://localhost:4000/plant/all`, {
      method: "GET",
      headers: this.requestHeaders,
    })
      .then((res) => res.json())
      .then((plant) => {
        console.log(plant);
      });
  };

  // useEffect(() => {
  //   fetchMedia(localStorage.getItem("token"));
  // }, []);


  handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`http://localhost:4000/plant/create`, {
      method: "POST",
      headers: this.requestHeaders,
      body: JSON.stringify({
        plant: {
          plantName: this.state.plant.plantName,
          plantType: this.state.plant.plantType,
          sunRequirement: this.state.plant.sunRequirement,
          waterNeeds: this.state.plant.waterNeeds,
          plantCare: this.state.plant.plantCare,
        },
      }),
    })
      .then((res) => res.json())
      .then((sessionData) => {
          console.log(sessionData)
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
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="plantName">
              <label htmlFor="plantName">Name</label>
              <input
                type="plantName"
                name="plantName"
                onChange={this.handleChange}
              />
            </div>
            <div className="plantType">
              <label htmlFor="plantType">Type</label>
              <input
                type="plantType"
                name="plantType"
                onChange={this.handleChange}
              />
            </div>
            <div className="sunRequirement">
              <label htmlFor="sunRequirement">sun</label>
              <input
                type="sunRequirement"
                name="sunRequirement"
                onChange={this.handleChange}
              />
            </div>
            <div className="waterNeeds">
              <label htmlFor="waterNeeds">water</label>
              <input
                type="waterNeeds"
                name="waterNeeds"
                onChange={this.handleChange}
              />
            </div>
            <div className="plantCare">
              <label htmlFor="plantCare">care</label>
              <input
                type="plantCare"
                name="plantCare"
                onChange={this.handleChange}
              />
            </div>

            <div className="submit">
              <button>Sign up</button>
              <small>Already Have an Account? Click to Login here</small>
            </div>
          </form>
        </div>
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
