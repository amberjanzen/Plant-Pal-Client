import React, { Component } from "react";
import Logout from "./Logout";
import UserEdit from "./UserEdit";
import { Container, Grid } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import APIURL from "../../../src/helpers/environment";

interface userProps {
    updateToken: (token: string, authenticated: boolean) => void;
    sessionData: { authenticated: boolean; token: string | null};
  
 }


type UserState = {
    user: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        createdAt: string,
        admin: boolean,
    }
}
type UserResults = {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    createdAt: string
    admin: boolean,

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
                createdAt: '',
                admin: false,
            }
        }
    }

    headers: any = { "Content-Type": "application/json",  'Authorization': this.props.sessionData.token  };

    componentDidMount() {
        this.getUser()
    }
    getUser() {
        fetch(`${APIURL}/user/`, {
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
                        createdAt: data.createdAt,
                        admin: data.admin,
                    }
                })
            })
            .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>
                 <Container>
                <Grid container spacing ={3}>
                        <h1>Account</h1>
                    <Grid item xs={12}>
                    <Logout updateToken={this.props.updateToken} />
                </Grid>
                </Grid>
                <br />
                <Grid container justify="space-around" alignItems="center">
                    <Grid item xs={6}>
                <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary= {this.state.user.firstName} secondary="First Name" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={this.state.user.lastName} secondary="last Name" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={this.state.user.email} secondary="Email" />
      </ListItem>
    </List>

                    </Grid>
                    <Grid item xs ={6}>
                        <UserEdit sessionData={this.props.sessionData} />
                    </Grid>
                </Grid>
            </Container>
            
            </div>
        )
    }
}
export default UserTable;


