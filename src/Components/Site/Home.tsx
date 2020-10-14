

import React, { Component } from "react";

class Home extends Component {

    render() {
        return (
            <div className = "nav">
                {/* <NavBar /> */}
            </div>
        )
    }
}
export default Home;




//   import React, {Component} from "react";
//   import Auth from "../../Auth/Auth"
// //   import PlantIndex from "../Plants/PlantIndex";
// type SessionData = {
//     sessionToken: string | null
//   }

// class Home extends Component<{},SessionData> {
//     constructor(props: {}){
//         super(props)
    
//         this.state = {
//           sessionToken: ""
//         }
//       }
    
//       componentDidMount() {
//         if(localStorage.getItem('token')){
//           this.setState({
//             sessionToken: localStorage.getItem('token')
//           })
            
//         }
//       }
    
//        updateToken = (newToken: string) => {
//         localStorage.setItem('token', newToken);
//         this.setState({
//           sessionToken: newToken
//         })
//         // console.log(sessionToken);
//       }
    
//        clearToken =  () => {
//         localStorage.clear();
//         this.setState({
//           sessionToken: ''
//         })
//       }

//     render(){
//         return(
//             <div className="main">
//             <div className="mainDiv">
//                 <h3>home</h3>
//                 <Auth updateToken={this.updateToken} />
//                 </div>
//             </div>
//         )
//     }
// }
// export default Home;
