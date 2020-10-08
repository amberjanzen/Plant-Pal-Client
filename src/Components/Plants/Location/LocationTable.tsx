
import React, {Component} from "react";
// import LocationEdit from "./LocationEdit"
import LocationCreate from "./LocationCreate"
import Locations from "./Locations"
import Grid from "@material-ui/core/Grid";


type LocationIndexProps = {
    sessionData: {authenticated: boolean, token: string|null}
}


class PlantTable extends Component <LocationIndexProps> {
    constructor(props: LocationIndexProps){
        super(props)
        console.log(props);
    }
    render(){
        return(
            <div>
                <Grid container spacing={3}>
               
                {/* <LocationEdit /> */}
                <Grid item xs={12}>
                <Locations sessionData={this.props.sessionData} />
                </Grid>
                <Grid item xs={12}>
                <LocationCreate sessionData={this.props.sessionData}/>
                </Grid>
                </Grid>
            </div>
        )
    }
}
export default PlantTable


