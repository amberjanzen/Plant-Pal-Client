import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";


//need to add enum in
// connect to model
//session token not working?


interface createPlant {
    plantName: string,
    plantType: string,
    sunRequirement: string,
    waterNeeds: string,
    plantCare: string
}
type NewPlantProps = {
    sessionData: { sessionData: {authenticated: boolean, token: string|null} }
}
class PlantCreate extends Component<NewPlantProps, createPlant> {
  constructor(props: NewPlantProps) {
    super(props);
    this.state = {
        plantName: '',
        plantType: '',
        sunRequirement: '',
        waterNeeds: '',
        plantCare: '',
    }
  }
  token:string|null = this.props.sessionData.sessionData.token
  requestHeaders: any = { "Content-Type": "application/json", 'Authorization': this.token };

  handleSubmit = (e: React.FormEvent<HTMLElement>) =>{
      e.preventDefault();
      fetch(`http://localhost:4000/plant/create`, {
      method: "POST",
      headers: this.requestHeaders,
      body: JSON.stringify({
        plantName: this.state.plantName,
        plantType: this.state.plantType,
        sunRequirement: this.state.sunRequirement,
        waterNeeds: this.state.waterNeeds,
        plantCare: this.state.plantCare,

      }),
      }).then(res => res.json())
      .then((data) => {
          console.log(data)
      })
      .catch((err) => console.log(err));

  }
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
        <div className="createTable">
        <h1> Add New Plant</h1>
        <FormControl>
          <TextField
            label="Plant Type"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ plantName: e.target.value });
            }}
          />
            <br />
          <TextField
            label="Plant Name"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ plantType: e.target.value });
            }}
          />
          <br />
             <TextField
            label="Sun Requirements"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ sunRequirement: e.target.value });
            }}
          />
            <br />
           <TextField
            label="Water Needs"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ waterNeeds: e.target.value });
            }}
          />
            <br />
          <TextField
            label="Plant Care"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ plantCare: e.target.value });
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              this.handleSubmit(e);
            }}
          >
            Add to your inventory
          </Button>
        </FormControl>
      </div>
    )
  }
}
export default PlantCreate;
