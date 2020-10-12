import React, {Component} from "react";
import { FormControl, TextField, Button } from "@material-ui/core";

//update location modal onclick
// map over location array?

interface locationInv {
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;
}
type EditLocationProps = {
  sessionData: { authenticated: boolean, token: string | null };
  
}

type LocationEditState ={
  locationData: locationInv[];
  results: locationInv;
  locationId: number;
  locationName: string;
  locationDescription: string;
  sunExposure: string;

}
class LocationEdit extends Component<EditLocationProps, LocationEditState> {
  constructor(props: EditLocationProps) {
    super(props);
    this.state = {
      locationId: 0,
      locationName: '',
      locationDescription: '',
      sunExposure: '',
      locationData: [],
      results:{
        locationId: 0,
        locationName: '',
        locationDescription: '',
        sunExposure: '',
      }
    }
  }
  headers: any = {
    "Content-Type": "application/json",
    "Authorization": this.props.sessionData.token,
  };

    componentDidMount() {
      this.fetchLocations()
      }
      componentDidUpdate() {
      }
      
      fetchLocations = () => {
        fetch(`http://localhost:4000/location`, {
          method: "GET",
          headers: new Headers(this.headers),
        })
        .then(res =>res.json())
        .then((data) => {
        console.log(data)
        this.setState({locationData: data.data})
      })
        .catch((err) => console.log(err));
        // .catch((err) => console.log(err));
      }


    handleSubmit = (e:any) =>{
      e.preventDefault();
        fetch(`http://localhost:4000/location/:id`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({
          location: {
          locationId: this.state.results.locationId,
          locationName: this.state.results.locationName,
          locationDescription: this.state.results.locationDescription,
          sunExposure: this.state.results.sunExposure,
          },
        }),
        }).then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => console.log(err));
    }



  
      render(){
          return(
              <div>
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

              </div>
          )
      }
    }
  

export default LocationEdit