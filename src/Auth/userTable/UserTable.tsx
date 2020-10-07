import React, { Component } from "react";
import Logout from "./Logout";
import { Grid } from "@material-ui/core";

interface userProps {
    updateToken: (token:string, authenticated: boolean) => void
 }
class UserTable extends Component<userProps> {

    render() {
        return (
            <div>
                <Grid item>
                    <Logout updateToken={this.props.updateToken} />
                </Grid>
            </div>
        )
    }
}
export default UserTable;