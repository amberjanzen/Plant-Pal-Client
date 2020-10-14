// import React, { Component } from "react";
import React, { Component, FunctionComponent } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image from '../assets/image.jpg';
import { Container, Select, MenuItem, InputLabel, FormControl, Dialog} from '@material-ui/core';
import { withStyles, Card, CardMedia } from '@material-ui/core';
// import SpringModal from './Modal';
// import FormDialog from './Dialog';
// import { CustomizedSnackbars } from './Snackbar';

// fetch works
// render to screen with- organize by location 
// connect to location table

const StyledCard = withStyles({
  root: {
      maxWidth: 345,
  }
})(Card);

const StyledCardMedia = withStyles({
  root: {
      height: 200
  }
})(CardMedia)




// type getPlantProps = {
//   sessionData: { authenticated: boolean; token: string | null },
// }

// export interface plantState {
//     data: plants[]
// }
type plantInv = {
      id: number,
      locationId: number,
      plantName: string;
      plantType: string;
      sunRequirement: string;
      waterNeeds: string;
      plantCare: string;
      addItem: (id: number, quantity: number) => void,
      handleOpen: () => void,
      handleClose: () => void,
      modalOpen: boolean,
      quantity: number,
  }
// type plants = {
//     [index: number]: plantInv
// }

const PlantInventory: FunctionComponent <plantInv> = (props) => {
  let quantity = 1;

  
  const updateQuantity = (newQuantity: any) => {
    quantity = newQuantity;
}
const mapQuantity = () => {
  let arr = [];
  for (let i = 1; i <= props.quantity; i++) {
      arr.push(<MenuItem value={i}>{i}</MenuItem>)
  }
  return arr;
}




    // state: plantState = {
    //     data: [
    //         // {
    //         //     plantName: "panel1",
    //         //     heading: ""
    //         // }
    //     ]
    // }

 
  // headers: any = {
  //   "Content-Type": "application/json",
  //   'Authorization': this.props.sessionData.token,
  // };
//   componentDidMount() {
//     this.fetchPlants()
// }
// componentDidUpdate() {
//     console.log(this.state);
// }

  // const fetchPlants = () => {
  //   fetch(`http://localhost:4000/plant/all`, {
  //     method: "GET",
  //     headers: this.headers,
  //   })
  //     .then((res) => res.json())
  //     .then((plants) => {
  //       this.setState({
  //           data: plants
  //       },() => console.log(this.state))
  //     }) .catch(err => console.log(err))
  // } 



        return (
          <Container key={props.id}>
          <StyledCard >
              <CardActionArea onClick={() => props.handleOpen()}>
                  <StyledCardMedia
                      title={props.plantName}
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      {props.plantName}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" component="p">
                          plantName: {props.plantName}
                      </Typography>
                  </CardContent>
              </CardActionArea>
              <CardActions>
                  <Button size="small" color="primary" style={{marginTop:16, width: '50%'}} 
                  onClick= {() => props.addItem(props.id, quantity)}> 
                      Add to Cart
                  </Button>
                  <FormControl style={{ width: '50%' }}>
                      <InputLabel style={{textAlign: 'right'}}>Quantity</InputLabel>
                      <Select
                      onChange={(e) => updateQuantity(e.target.value)}>
                          {mapQuantity()}
                      </Select>
                  </FormControl>
              </CardActions>
          </StyledCard>
          {/* <Dialog handleOpen= {props.handleOpen} handleClose={props.handleClose} modalOpen={props.modalOpen}/>
          <Dialog handleOpen= {props.handleOpen} handleClose={props.handleClose} modalOpen={props.modalOpen}/> */}
      </Container>
  );
        
    
}

export default PlantInventory;