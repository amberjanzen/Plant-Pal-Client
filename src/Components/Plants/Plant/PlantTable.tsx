import React, {Component} from "react";
import PlantEdit from "./PlantEdit";
import PlantCreate from "./PlantCreate";

type PlantIndexProps = {
    sessionData: {authenticated: boolean, token: string|null}
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

                {/* <PlantEdit /> */}

                <PlantCreate sessionData={this.props.sessionData} />
            </div>
        )
    }
}
export default PlantTable
