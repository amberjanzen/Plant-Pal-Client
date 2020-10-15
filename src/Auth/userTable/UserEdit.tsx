import React, { Component } from "react";
import { Button, TextField, FormControl, Container, Grid } from "@material-ui/core";
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
      <Container>
         <Grid container spacing={3}>

         </Grid>
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
              <br />
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
              <br />
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
              <br />
                <TextField
                  name="email"
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <br />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                />
                <br />
              </div>
              <div>
              <br />
              <Button 
              type="submit"
              variant ="contained"
              color = "primary"
            
              >Update Account</Button>

              </div>
            </Form>
          )}
        </Formik>
        {this.state.submitted===true? <Redirect to='/Auth'/>:null}
                <br />
                <Button
                variant ="contained"
                 color="secondary" onClick={this.delUser}>Delete My Account</Button>
      </div>
      </Container>
    );
  }
}
export default UserEdit;
