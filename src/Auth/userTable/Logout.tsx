import React, { Component } from "react";
import { Button } from "@material-ui/core";

type userLogoutProps = {
  updateToken: (token: string) => void;
};

class Logout extends Component<userLogoutProps> {
  removeToken = (): void => {
    window.localStorage.removeItem("token");
    this.props.updateToken("");
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
