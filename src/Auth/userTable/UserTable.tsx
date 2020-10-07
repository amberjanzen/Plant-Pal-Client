import React, { Component } from "react";
import Logout from "./Logout";
import { Grid } from "@material-ui/core";

type userProps = {
    updateToken: (token: string) => void
}
class UserTable extends Component<userProps> {

    render() {
        return (
            <div>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                    <Grid item>
                        <Logout updateToken={this.props.updateToken} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default UserTable;