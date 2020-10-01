import React, {Component} from "react";
import PlantTable from "./Plant/PlantTable";
import PlantSearch from "./PlantSearch";
import LocationTable from "./Location/LocationTable";


class PlantIndex extends Component {

    render(){
        return(
            <div className ="main">
            <div className ="mainDiv">
                <PlantTable />
                <hr />
                <PlantSearch />
                <hr />
                <LocationTable />
                <hr />
            </div>
        </div>
        )
    }
}
export default PlantIndex
