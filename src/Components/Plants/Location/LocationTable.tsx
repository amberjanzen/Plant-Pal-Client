
import React, {Component} from "react";
// import LocationEdit from "./LocationEdit"
import LocationCreate from "./LocationCreate"
import Locations from "./Locations"

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
                <h3>locationTable</h3>
                {/* <LocationEdit /> */}
                <Locations sessionData={this.props.sessionData} />
                <LocationCreate sessionData={this.props.sessionData}/>

            </div>
        )
    }
}
export default PlantTable


