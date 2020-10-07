import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


// does not fetch
// need to query Userid? 


type getLocationProps = {
    sessionData: {authenticated: boolean, token: string|null}
}


class Locations extends Component<getLocationProps> {

    
  headers: any = {
    "Content-Type": "application/json",
    'Authorization': this.props.sessionData.token,
  };
  componentDidMount() {
    this.fetchLocations()
}
componentDidUpdate() {
    console.log(this.state);
}

  fetchLocations = () => {
    fetch(`http://localhost:4000/location`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((locations) => {
        this.setState({
            data: locations
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

export default Locations;