import React, { Component } from "react";
import { Button } from "@material-ui/core";

// works?
// show in navbar- currently shown in user table


interface userLogoutProps {
  updateToken: (token:string, authenticated: boolean) => void
}

class Logout extends Component<userLogoutProps> {
  removeToken = (): void => {
    window.localStorage.removeItem("token");
    this.props.updateToken("", false);
  };

  render() {
    // type userLogin = {
    //     login: {
    //         email: string,
    //         password: string,
    //     },

    return (
      <div>
        {" "}
        <Button onClick={this.removeToken}>Logout</Button>
      </div>
    );
  }
}

export default Logout;
