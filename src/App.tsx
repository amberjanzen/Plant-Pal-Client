import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Site/Header";
import Footer from "./Components/Site/Footer";
import NavBar from "./Components/Site/NavBar";

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
    // this.updateAdmin = this.updateAdmin.bind(this)
    // this.protectedViews = this.protectedViews.bind(this);
  }
  updateToken(userToken: string, authenticated: boolean): void {
    this.setState({ token: userToken, authenticated: authenticated });
  //   localStorage.setItem("admin", JSON.stringify(newAdmin));
	// 	this.setState({admin: newAdmin});
  }


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

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <NavBar updateToken={this.updateToken} sessionData={this.state} />
        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
