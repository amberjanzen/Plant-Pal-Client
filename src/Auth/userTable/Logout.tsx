import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
// import APIURL from "../../../src/helpers/environment";

// works?
// show in navbar- currently shown in user table


interface userLogoutProps {
  updateToken: (token: string, authenticated: boolean) => void;
}
type submitState = {
  loggedOut: boolean;
};

class Logout extends Component<userLogoutProps, submitState> {
  state = {
    loggedOut: false,
  };
  
  removeToken = (): void => {
    window.localStorage.removeItem("token");
    this.props.updateToken("", false);
    this.setState({ loggedOut: true })
  };
  componentDidMount() {
  }

  componentWillUnmount() {
  }



  render() {
    // type userLogin = {
    //     login: {
    //         email: string,
    //         password: string,
    //     },

    return (
      <div>
          {(this.state.loggedOut === true) ? <Redirect to='/Auth' /> : null}
        <Button 
        variant ="contained"
        color ="default"
        onClick={this.removeToken}>Logout</Button>
      </div>
    );
  }
}

export default Logout;
