  import React, {Component} from "react";
  import Auth from "../../Auth/Auth"
//   import PlantIndex from "../Plants/PlantIndex";

class Home extends Component {

    render(){
        return(
            <div className="main">
            <div className="mainDiv">
                <h3>home</h3>
                <Auth />
                </div>
            </div>
        )
    }
}
export default Home;