import React, { Component } from "react";
import Logout from "./Logout";
import UserEdit from "./UserEdit";
import { Container, Grid } from '@material-ui/core'


interface userProps {
    updateToken: (token:string, authenticated: boolean) => void
    sessionData: { authenticated: boolean, token: string | null }
 }


type UserState = {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: string
    }
}
type UserResults = {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string

}
class UserTable extends Component<userProps, UserState> {
    constructor(props: userProps) {
        super(props)
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                createdAt: ''
            }
        }
    }

    headers: any = { "Content-Type": "application/json",  'Authorization': this.props.sessionData.token  };

    componentDidMount() {
        this.getUser()
    }
    getUser() {
        fetch(`http://localhost:4000/user/`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => res.json())
            .then((data: UserResults) => {
                this.setState({
                    user: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        createdAt: data.createdAt
                    }
                })
            })
            .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                 <Container>
                <Grid container spacing ={6}>
                        <h1>Account</h1>
                    <Grid item xs={6}>
                    <Logout updateToken={this.props.updateToken} />
                </Grid>
                </Grid>
                <br />
                <Grid container justify="space-around" alignItems="center">
                    <Grid item xs={6}>
                        <p>First Name: {this.state.user.firstName}</p>
                        <p>Last Name: {this.state.user.lastName}</p>
                        <p>E-mail: {this.state.user.email}</p>
                    </Grid>
                    <Grid item xs ={3}>
                        <UserEdit sessionData={this.props.sessionData} />
                    </Grid>
                </Grid>
            </Container>
            </div>
        )
    }
}
export default UserTable;