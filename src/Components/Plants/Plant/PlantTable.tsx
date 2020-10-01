import React, {Component} from "react";
import PlantEdit from "./PlantEdit";
import PlantCreate from "./PlantCreate";




class PlantTable extends Component {

    render(){
        return(
            <div>
                <h3>PlantTable</h3>
                <hr />
                <PlantEdit />
                <hr />
                <PlantCreate />

            </div>
        )
    }
}
export default PlantTable
