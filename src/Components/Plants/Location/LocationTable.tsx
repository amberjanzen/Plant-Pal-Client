import React, {Component} from "react";
import LocationEdit from "./LocationEdit"
import LocationCreate from "./LocationCreate"




class PlantTable extends Component {

    render(){
        return(
            <div>
                <h3>locationTable</h3>
                <hr />
                <LocationEdit />
                <hr />
                <LocationCreate />

            </div>
        )
    }
}
export default PlantTable

