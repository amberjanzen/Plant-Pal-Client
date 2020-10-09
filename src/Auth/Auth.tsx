import React, { Component } from "react";
import ReactDOM from "react-dom";
import { UserLogin } from "./UserLogin";
import { UserCreate } from "./UserCreate";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";


//format toggle button- text turns to white when hover & change to lowercase
//redirect logic needs event handler/onSubmit- Place in app/nav or login/create?git  

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

type AcceptedProps = {
  updateToken: (token: string, authenticated: boolean) => void,
  sessionData: { authenticated: boolean; token: string | null };
    }
type UserState = {
  userSignUp: boolean;
  loggedIn: boolean;
};



class Auth extends React.Component<AcceptedProps, UserState> {

  constructor(props: AcceptedProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      userSignUp: true,
      loggedIn: false,
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
  afterLogin = (): void => {
    this.props.updateToken("", true);
    this.setState({ loggedIn: true })
  };


  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          {(this.state.loggedIn === true) ? <Redirect to='/PlantIndex' /> : null}
          <div className="container">
            {this.state.userSignUp ? (
              <UserCreate updateToken={this.props.updateToken} sessionData={this.props.sessionData} />
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