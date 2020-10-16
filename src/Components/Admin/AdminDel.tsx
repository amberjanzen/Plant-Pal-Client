import React, { Component } from "react";
import { Button } from "@material-ui/core";
import APIURL from "../../helpers/environment";

//admin delete location button -rendered in Adminlocation//

interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}

interface adminLocProps {
  sessionData: { authenticated: boolean; token: string | null };
  location: locationInv;
}


type LocationEditState = {
  locationData: locationInv[];
  locationId: number;
  submitted: boolean;
};

class AdminDel extends Component<adminLocProps, LocationEditState> {
  constructor(props: adminLocProps) {
    super(props);
    this.state = {
      locationId: 0,
      locationData: [],
      submitted: false,
    };
  }

  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

  submitClick = () => {
    this.handleDelete();
  };

  //   componentDidMount() {
  //  }

  handleDelete = (): any => {
    if (this.props.sessionData !== undefined) {
      fetch(`${APIURL}/location/${this.props.location.locationId}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((response) => {
          console.log(response.ok);
          if (response.ok === true) {
            console.log(`location deleted.`);
            window.location.reload();
          } else {
            console.log("could not delete location.");
          }
        })
        .catch((error: Error) => console.log(error));
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleDelete}>delete location</Button>
      </div>
    );
  }
}
export default AdminDel;
