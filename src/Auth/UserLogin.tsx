import React, { Component } from "react";
import "../StyleCSS/auth.css";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import APIURL from "../../src/helpers/environment";

interface LoginState {
  email: string;
  password: string;
}
type LoginFormProps = {
  updateToken: (token: string, authenticated: boolean) => void;
  updateAdmin: (admin: boolean)=>void,
};
type submitState = {
  loggedIn: boolean;
  admin: boolean;
};
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
          loginProps.updateAdmin(data.admin ? true: false)
          this.setState({ loggedIn: true, admin: data.admin ? true: false });
          this.setState({admin: data.admin})
        } else {
          alert(`error`);
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
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
                <TextField
                  name="email"
                  label="E-mail"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit">Login</Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
