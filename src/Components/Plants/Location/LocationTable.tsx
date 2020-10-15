
import React, {Component} from "react";
// import LocationEdit from "./LocationEdit"
import LocationCreate from "./LocationCreate";
import Locations from "./Locations";
import Grid from "@material-ui/core/Grid";


type LocationIndexProps = {
    sessionData: { authenticated: boolean, token: string | null },
 
}


class PlantTable extends Component <LocationIndexProps> {
    constructor(props: LocationIndexProps){
        super(props)
        console.log(props);
        this.state ={
            
        }
    }
    render(){
        return(
            <div>
                <Grid container spacing={3}>
                {/* <LocationEdit /> */}
                <Grid item xs={12}>
                <Locations  sessionData={this.props.sessionData} />
                </Grid>
                <Grid item xs={12}>
                <LocationCreate  sessionData={this.props.sessionData}/>
                </Grid>
                </Grid>
            </div>
        )
    }
}
export default PlantTable
// import React from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Grid from "@material-ui/core/Grid";
// import LocationCreate from "./LocationCreate"
// import Locations from "./Locations"
// import PlantIndex from '../PlantIndex';
// // import Locations from "./Locations"

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: any) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// type tabProps = {
//   appState: {authenticated: boolean, token: string | null}
//   classes: any,
//   LocationState: LocationState,
  
// }

// type tabState = {
//   value: number,
//   classes: any
// }
// export interface LocationState {
//   data: locationObject[]
// }

// type locationObject = {
//   locationId: number,
//   locationName: string,
// }



// class PlantTable extends Component<tabProps, tabState> {
//   constructor(props: tabProps) {
//     super(props)
//     this.state = {
//       value: 0,
//       classes: useStyles
//     }
//   }
//   componentDidUpdate(){
// }
//   handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     this.setState({ value: newValue });
//   };

  
//   render() {
//     const { classes } = this.props
//     return (
//       <div className={classes.root} >
//         <Tabs
//           orientation="horizontal"
//           variant="scrollable"
//           value={this.state.value}
//           onChange={this.handleChange}
//           aria-label="Locations"
//           className={classes.tabs}
//         >
//           {this.props.LocationState.data.map((location, i) => {
//             return <Tab key={i} label={location ? location.locationName : 'Nothing Found'} {...a11yProps(i)} />

//           })}
//         </Tabs>


//         {this.props.LocationState.data.map((Location, i)=>{
          
//           return (<TabPanel key={i}value={this.state.value} index={i} >
//             <Grid container justify='center' alignItems='center'>

//             <h1>{location.locationName}</h1>
      
//             </Grid>
//             <Locations sessionData={this.props.sessionData} plID={location.locationName} />
//         </TabPanel>)
//         })}

//         <TabPanel value={this.state.value} index={this.props.LocationState.data.length}>
//           <LocationCreate sessionData={this.props.sessionData}/>
//         </TabPanel>


//       </div>
//     );
//   }
// }
// export default withStyles(styles, { withTheme: true })(PlantTable)


// import React, {Component} from "react";
// // import LocationEdit from "./LocationEdit"
// import LocationCreate from "./LocationCreate"
// import Locations from "./Locations"
// import Grid from "@material-ui/core/Grid";


// type LocationIndexProps = {
//     sessionData: { authenticated: boolean, token: string | null },
// }


// class PlantTable extends Component <LocationIndexProps> {
//     constructor(props: LocationIndexProps){
//         super(props)
//         console.log(props);
//     }
//     render(){
//         return(
//             <div>
//                 <Grid container spacing={3}>
               
//                 {/* <LocationEdit /> */}
//                 <Grid item xs={12}>
//                 <Locations  sessionData={this.props.sessionData} />
//                 </Grid>
//                 <Grid item xs={12}>
//                 <LocationCreate  sessionData={this.props.sessionData}/>
//                 </Grid>
//                 </Grid>
//             </div>
//         )
//     }
// }
// export default PlantTable