import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";


//need to add enum in
// connect to model
//session token not working?


interface createLocation {
    locationName: string,
    locationDescription: string,
    sunExposure: string,
}
type NewLocationProps = {
    sessionData: { sessionData: {authenticated: boolean, token: string|null} }
}
class LocationCreate extends Component<NewLocationProps, createLocation> {
  constructor(props: NewLocationProps) {
    super(props);
    this.state = {
        locationName: '',
        locationDescription: '',
        sunExposure: '',
    }
  }
  token:string|null = this.props.sessionData.sessionData.token
  requestHeaders: any = { "Content-Type": "application/json", 'Authorization': this.token };

  handleSubmit = (e: React.FormEvent<HTMLElement>) =>{
      e.preventDefault();
      fetch(`http://localhost:4000/location/create`, {
      method: "POST",
      headers: this.requestHeaders,
      body: JSON.stringify({
        locationName: this.state.locationName,
        locationDescription: this.state.locationDescription,
        sunExposure: this.state.sunExposure,
      }),
      }).then(res => res.json())
      .then((data) => {
          console.log(data)
      })
      .catch((err) => console.log(err));

  }

  render() {

    return (
        <div className="createTable">
        <h1> Add Location</h1>
        <FormControl>
          <TextField
            label="Location"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ locationName: e.target.value });
            }}
          />
            <br />
          <TextField
            label="Description"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ locationDescription: e.target.value });
            }}
          />
          <br />
             <TextField
            label="Sun Exposure"
            variant="outlined"
            type="text"
            onChange={(e) => {
              this.setState({ sunExposure: e.target.value });
            }}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              this.handleSubmit(e);
            }}
          >
            Add Location
          </Button>
        </FormControl>
      </div>
    )
  }
}
export default LocationCreate;



