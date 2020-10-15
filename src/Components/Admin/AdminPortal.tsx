import { Paper, TableContainer, Button, Table, TableHead, TableCell, TableBody, TableRow, Card, CardContent, Container } from "@material-ui/core";
import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import APIURL from '../../helpers/environment'
import AdminLocation from "./AdminLocation";

type AdminUserProps = {
    sessionData: { authenticated: boolean, token: string | null, admin: boolean},
  };


type AdminState = {
    users: userData[]
}
type userData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    admin: boolean,
    id: number
}

const styles = {
    table: {
      minWidth: 650,
    },
  };


class AdminPortal extends Component<AdminUserProps, AdminState> {
    constructor(props: AdminUserProps) {
        super(props)
        this.state = {
            users: []
                }
    }
    componentDidMount() {
        this.getUsers()
    }
    headers: any = { "Content-Type": "application/json",  'Authorization': this.props.sessionData.token  };
    getUsers(): void {
        if(this.props.sessionData.token!==null){
            fetch(`${APIURL}/user/admin/users`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    users: data
                })
            })
        }
    }
    deleteUser (user: userData) {
        fetch(`${APIURL}/admin/users/${user.id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => res.json())
            .then(response => {
                if (!response.error) {
                    this.setState({users:response.user})
                } else {
                    alert(`${response.error.errors[0].message}`)
                }
            })
            .catch(err => console.log(err))
    }

    locationInvMap = () => {
        console.log();
        return this.state.users.map((user) => {
          return (
            <TableRow key={user.id}>
            <TableCell component="th" scope="row"> {user.firstName} </TableCell>
            <TableCell align="right">{user.lastName}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.password}</TableCell>
                  {/* <Button type="submit" variant="contained" color="primary">
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                  </Button> */}

            </TableRow>
          );
        });
      };
    render() {
        // if (this.props.sessionData.admin !== false) {
        //     return <Redirect to="/Auth" />
        // }; /// ugh wont work

        return (
            <Container>
                <h3>Users</h3>
            <TableContainer component={Paper}>
            <Table style={styles.table} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'> First Name</TableCell>
                        <TableCell align='right'>Last Name</TableCell>
                        <TableCell align='right'>email</TableCell>
                        <TableCell align='right'>password</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {this.locationInvMap()}

                </TableBody>
            </Table>
        </TableContainer>
            </Container>

      
                
        )
    }
}
export default AdminPortal;