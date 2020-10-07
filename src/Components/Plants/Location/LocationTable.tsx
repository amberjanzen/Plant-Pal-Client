
import React, {Component} from "react";
// import LocationEdit from "./LocationEdit"
import LocationCreate from "./LocationCreate"

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
                <LocationCreate sessionData={this.props}/>

            </div>
        )
    }
}
export default PlantTable


