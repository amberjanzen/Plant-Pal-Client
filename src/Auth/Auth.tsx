  
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { UserLogin } from "./UserLogin";
import { UserCreate } from "./UserCreate";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

//format toggle button- text turns to white when hover & change to lowercase

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

type AcceptedProps = {
        updateToken: (token:string, authenticated: boolean) => void
        
    }
type UserState = {
  userSignUp: boolean;
};

class Auth extends React.Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      userSignUp: true,
    };
  }
  toggle = (event: any) => {
    event.preventDefault();
    if (this.state.userSignUp === true) {
      return this.setState({
        userSignUp: false,
      });
    }
    if (this.state.userSignUp === false) {
      return this.setState({
        userSignUp: true,
      });
    }
  };


  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <div className="container">
            {this.state.userSignUp ? (
              <UserCreate updateToken={this.props.updateToken} />
            ) : (
              <UserLogin updateToken={this.props.updateToken} />
            )}
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                onClick={(e) => {
                  this.toggle(e);
                }}
              >
                {this.state.userSignUp
                  ? "Already have an account? Click here to login"
                  : "Do not have an account? Click here to register "}
              </Button>
            </ThemeProvider>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
export default Auth;