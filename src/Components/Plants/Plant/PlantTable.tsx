import React, {Component} from "react";
import PlantEdit from "./PlantEdit";
import PlantCreate from "./PlantCreate";
import PlantInventory from "./PlantInventory";

type PlantIndexProps = {
    sessionData: { authenticated: boolean; token: string | null },
}


class PlantTable extends Component<PlantIndexProps> {
    constructor(props: PlantIndexProps){
    super(props)
    console.log(props);
}

    render(){
        return(
            <div>
                <h3>PlantTable</h3>
                

                <PlantInventory sessionData={this.props.sessionData}/>

                {/* <PlantCreate sessionData={this.props.sessionData} /> */}
            </div>
        )
    }
}
export default PlantTable
