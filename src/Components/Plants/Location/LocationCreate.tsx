import React, { Component } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";


// sunExposure: {
//   type: DataTypes.ENUM('full sun', 'partial sunshade', 'full shade'),
//   allowNull: true,
// }

//location fetch works
//create location- then create plant (map over)

interface createLocation {
    locationName: string,
    locationDescription: string,
    sunExposure: string,
}
type NewLocationProps = {
  sessionData: { authenticated: boolean, token: string | null };
  // refresh: (newState:boolean) => void,
  // refreshState: boolean
}
class LocationCreate extends Component<NewLocationProps, createLocation> {
  constructor(props: NewLocationProps) {
    super(props);
    this.state = {
        locationName: '',
        locationDescription: '',
        sunExposure: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(){console.log(this.state)}

  handleChange = (e: any) => {
    e.preventDefault();
    const { name, value} = e.target;
    this.setState(Object.assign(this.state, { [name]: value }));
  };

  // token:string|null = this.props.sessionData.token
  headers: any = { "Content-Type": "application/json",  'Authorization': this.props.sessionData.token  };
  
  handleSubmit = (e: React.FormEvent<HTMLElement>) =>{
      e.preventDefault();
      fetch(`http://localhost:4000/location/create`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        location: {
        locationName: this.state.locationName,
        locationDescription: this.state.locationDescription,
        sunExposure: this.state.sunExposure,
        },
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




