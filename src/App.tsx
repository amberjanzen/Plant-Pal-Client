import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Site/Header";
import Footer from "./Components/Site/Footer";
import NavBar from "./Components/Site/NavBar";

type SessionData = {
  token: string | null;
  authenticated: boolean;
 
};
let sessionToken = localStorage.getItem("token");
let validateSession = sessionToken ? true : false;
class App extends Component<{}, SessionData> {
  constructor(props: {}) {
    super(props);
    this.state = {
      authenticated: validateSession,
      token: sessionToken,
    };
    this.updateToken = this.updateToken.bind(this);
  }
  updateToken(userToken: string, authenticated: boolean): void {
    this.setState({ token: userToken, authenticated: authenticated });
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
          <NavBar updateToken={this.updateToken} sessionData={this.state}  />
        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
