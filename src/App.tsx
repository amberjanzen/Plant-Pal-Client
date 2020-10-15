import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Components/Site/Header";
import Footer from "./Components/Site/Footer";
import NavBar from "./Components/Site/NavBar";
import Auth from "./Auth/Auth";
import PlantIndex from "./Components/Plants/PlantIndex";
import UserTable from "./Auth/userTable/UserTable";
import Resources from "./Components/Site/Resources";
import AdminPortal from "./Components/Admin/AdminPortal";


type SessionData = {
  token: string | null;
  authenticated: boolean;
  admin: boolean
 
};
let sessionToken = localStorage.getItem("token");
let validateSession = sessionToken ? true : false;


class App extends Component<{}, SessionData> {
  constructor(props: {}) {
    super(props);
    this.state = {
      authenticated: validateSession,
      token: sessionToken,
      admin: false,
    };
    this.updateToken = this.updateToken.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this)
    // this.protectedViews = this.protectedViews.bind(this);
  }
  updateToken(userToken: string, authenticated: boolean): void {
    this.setState({ token: userToken, authenticated: authenticated});
  //   localStorage.setItem("admin", JSON.stringify(newAdmin));
	// 	this.setState({admin: newAdmin});
  }

  updateAdmin = (admin: boolean) => {
    this.setState({admin: admin});
  };
  


  protectedViews = () => {
    return validateSession ?(
      <Route exact path = "/">
        <PlantIndex  sessionData={this.state}
        />
      </Route>
      ) : (
        <Route exact path = "/">
          <Auth
          updateToken={this.updateToken}
          sessionData={this.state}
          updateAdmin={this.updateAdmin}
           />
        </Route>
     )
  };

  // protectedViewThree = () => {
  //   return this.state.setToken === localStorage.getItem("token") ? (
  //       <Admin 


  //       />
  //   ) : (
  //     <Auth
     

  //     />
  //   )
  // }
  // componentWillUnmount(): void {
  //   this.updateToken("", false);
  //   window.localStorage.removeItem("token");
  // }
  //   // console.log(sessionToken);
  // }
  //  clearToken =  () => {
  //   localStorage.clear();
  //   this.setState({
  //     sessionToken: ''
  //   })
  // }
  
  // {this.protectedViews()}



  // const PrivateRoute =({ component: Component, ...rest}) =>(
  //   <Route {...rest} render={(props)=>(

  //   )}
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <NavBar updateToken={this.updateToken} sessionData={this.state} updateAdmin={this.updateAdmin}/>
          <Route>
          {this.protectedViews()}
          </Route>
          <Switch>
            <Route exact path="/auth">
              <Auth
                updateToken={this.updateToken}
                sessionData={this.state}
                updateAdmin={this.updateAdmin}
              />
            </Route>
            <Route exact path="/AdminPortal">
              <AdminPortal
                sessionData={this.state}
              />
            </Route>
            <Route exact path="/UserTable">
              <UserTable updateToken={this.updateToken} sessionData={this.state} />
            </Route>
            <Route exact path="/plantIndex">
              <PlantIndex sessionData={this.state} />
            </Route>
            <Route exact path="/Resources">
              <Resources />
            </Route>
          </Switch>

        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
