import React, { Component } from "react";

// fetch works
// render to screen with- organize by location 
// connect to location table

type getPlantProps = {
  sessionData: { authenticated: boolean; token: string | null },
}

export interface plantState {
    data: plants[]
}
type plantInv = {
    plant: {
      plantName: string;
      plantType: string;
      sunRequirement: string;
      waterNeeds: string;
      plantCare: string;
    };
  }
type plants = {
    [index: number]: plantInv
}

class PlantInventory extends Component<getPlantProps, plantState> {

    state: plantState = {
        data: [
            // {
            //     plantName: "panel1",
            //     heading: ""
            // }
        ]
    }

     // token:string|null = this.props.SessionData.SessionData.token
  headers: any = {
    "Content-Type": "application/json",
    'Authorization': this.props.sessionData.token,
  };
  componentDidMount() {
    this.fetchPlants()
}
componentDidUpdate() {
    console.log(this.state);
}

  fetchPlants = () => {
    fetch(`http://localhost:4000/plant/all`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((plants) => {
        this.setState({
            data: plants
        },() => console.log(this.state))
      }) .catch(err => console.log(err))
  } 

    render() {

        return (
            <div>
               
            </div>
        )
    }
}

export default PlantInventory;