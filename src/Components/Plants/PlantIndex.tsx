import React, {Component} from "react";
import PlantSearch from "./PlantSearch";
import LocationTable from "./Location/LocationTable";
import PlantCreate from "./Plant/PlantCreate";
import PlantTable from "./Plant/PlantTable";

type PlantIndexProps = {
    sessionData: {authenticated: boolean, token: string|null}
}

class PlantIndex extends Component<PlantIndexProps> {
    constructor(props: PlantIndexProps){
        super(props)
        console.log(props);
        
    }

    render(){
        return(
            <div className ="main">
            <div className ="mainDiv">
                <PlantTable sessionData={this.props.sessionData} />
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
