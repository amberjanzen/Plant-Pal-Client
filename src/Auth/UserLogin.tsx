import React, { Component } from "react";
import "../StyleCSS/auth.css";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";

interface LoginState {
  email: string;
  password: string;
}
type LoginFormProps = {
  updateToken: (token: string, authenticated: boolean) => void;
};
type submitState = {
  loggedIn: boolean;
};
export class UserLogin extends Component<LoginFormProps, submitState> {
  state = {
    loggedIn: false,
  };
  LoginSubmit(values: LoginState, loginProps: LoginFormProps) {
    fetch(`http://localhost:4000/user/login`, {
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
          this.setState({ loggedIn: true });
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
