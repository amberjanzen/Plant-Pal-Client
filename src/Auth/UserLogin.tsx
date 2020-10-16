import React, { Component } from "react";
import {
  BrowserRouter as Router,

  Redirect,
} from "react-router-dom";
import "../StyleCSS/auth.css";
import { Button, TextField } from "@material-ui/core";
import {
  createMuiTheme,
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Form, Formik } from "formik";
import APIURL from "../../src/helpers/environment";
import "../StyleCSS/auth.css";

interface LoginState {
  email: string;
  password: string;
}
type LoginFormProps = {
  updateToken: (token: string, authenticated: boolean) => void;
  updateAdmin: (admin: boolean) => void;
};
type submitState = {
  loggedIn: boolean;
  admin: boolean;
};

const StyledButton = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    alignItems: "center",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    marginRight: "0.25em",
    margintop: "0.5em",
    backgroundColor: "#FB7957",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const StyledForm = withStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  label: {
    textTransform: "capitalize",
  },
})(TextField);

export class UserLogin extends Component<LoginFormProps, submitState> {
  state = {
    loggedIn: false,
    admin: false,
  };
  LoginSubmit(values: LoginState, loginProps: LoginFormProps) {
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          window.localStorage.setItem("token", data.sessionToken);
          loginProps.updateToken(data.sessionToken, true);
          loginProps.updateAdmin(data.admin ? true : false);
          this.setState({ loggedIn: true, admin: data.admin ? true : false });
          this.setState({ admin: data.admin });
        } else {
          alert(`error`);
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
    <div>
          <h3>Login</h3>
          <br />
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            this.LoginSubmit(values, this.props);
          }}
          >
          {({ values, handleChange }) => (
            <Form>
              <div>
                <StyledForm
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  />
                <br />
              </div>
              <div>
                <br />
                <StyledForm
                  id="outlined-basic"
                  variant="outlined"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  />
              </div>
              <div>
                <br />

                <button type="submit">
                  Login
                </button>
                  {(this.state.loggedIn === true) ?
                    ((this.state.admin)?<Redirect to='/AdminPortal' />:<Redirect to='/PlantIndex' />)
                    : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
