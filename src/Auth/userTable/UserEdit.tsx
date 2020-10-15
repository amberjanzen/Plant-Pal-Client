import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import { Redirect } from "react-router-dom";
import APIURL from "../../../src/helpers/environment";

interface userProps {
sessionData: { authenticated: boolean; token: string | null};

}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
type delUserState = {
    submitted: boolean
    }


class UserEdit extends Component<userProps> {
    state={
        submitted:false
    }
  headers: any = {
    "Content-Type": "application/json",
    Authorization: this.props.sessionData.token,
  };

   
  delUser = (): any => {
    fetch(`${APIURL}/user/`, {
        method: 'DELETE',
        headers: this.headers
    })
        .then(res => res.json())
        .then(data=>{
            if (!data.error){
                this.setState({submitted:true})
                alert('Your account has been permanently deleted.')
            } else{
                alert(`${data.error.errors[0].message}`)
            }
        })
        .catch(err => console.log(err))
}
  render() {
    return (
      <div>
        <h1>Update User</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={(values: User) => {
            fetch(`${APIURL}/user/`, {
              method: "PUT",
              headers: this.headers,
              body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (!data.error) {
                  this.setState({ submitted: true });
                } else {
                  alert(`${data.error.errors[0].message}`);
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div>
                <TextField
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>
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

              <Button type="submit">Update Account</Button>
            </Form>
          )}
        </Formik>
        {this.state.submitted===true? <Redirect to='/Auth'/>:null}
                <br />
                <Button color="secondary" onClick={this.delUser}>Delete My Account</Button>
      </div>
    );
  }
}
export default UserEdit;
