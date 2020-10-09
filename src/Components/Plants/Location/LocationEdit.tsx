import React, {Component} from "react";

//update location modal onclick
// map over location array?

interface EditLocation {
    locationName: string,
    locationDescription: string,
    sunExposure: string,
}
type EditLocationProps = {
  sessionData: { authenticated: boolean, token: string | null };
  
}
class LocationEdit extends Component<EditLocationProps, EditLocation> {

    componentDidUpdate(){
    }

    handleChange = (e: any) => {
      e.preventDefault();
      const { name, value} = e.target;
      this.setState(Object.assign(this.state, { [name]: value }));
    };

    headers: any = { "Content-Type": "application/json",  'Authorization': this.props.sessionData.token  };

    // handleSubmit = (e: React.FormEvent<HTMLElement>) =>{
    //     e.preventDefault();
    //     fetch(`http://localhost:4000/location/:id`, {
    //     method: "PUT",
    //     headers: this.headers,
    //     body: JSON.stringify({
    //       location: {
    //       locationName: this.state.locationName,
    //       locationDescription: this.state.locationDescription,
    //       sunExposure: this.state.sunExposure,
    //       },
    //     }),
    //     }).then(res => res.json())
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     .catch((err) => console.log(err));
    // }
      render(){
          return(
              <div>
                  <h3>LocationEdit</h3>

              </div>
          )
      }
  }

export default LocationEdit