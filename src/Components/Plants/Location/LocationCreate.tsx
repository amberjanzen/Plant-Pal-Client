import React, { Component } from "react";

import { FormControl, TextField, Button} from "@material-ui/core";

import APIURL from "../../../helpers/environment";


//create locations -when user creates location, user can then add plants from locationId(from location fetch)


// sunExposure: {
//   type: DataTypes.ENUM('full sun', 'partial sunshade', 'full shade'),
//   allowNull: true,
// }


type NewLocationProps = {
  sessionData: { authenticated: boolean; token: string | null };
};
export interface createLocation {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}



class LocationCreate extends Component<NewLocationProps, createLocation> {
  constructor(props: NewLocationProps) {
    super(props);
    this.state = {
      locationId: 0,
      locationName: "",
      locationDescription: "",
      sunExposure: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state);
  }


  handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(Object.assign(this.state, { [name]: value }));
  };

  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    fetch(`${APIURL}/location/create`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        location: {
          locationId: this.state.locationId,
          locationName: this.state.locationName,
          locationDescription: this.state.locationDescription,
          sunExposure: this.state.sunExposure,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="createTable">
        <h3> Add Location</h3>
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
          <button
            onClick={(e) => {
              this.handleSubmit(e);
            }}
          >
            Add Plant Location
          </button>
        </FormControl>
      </div>
    );
  }
}
export default LocationCreate;
