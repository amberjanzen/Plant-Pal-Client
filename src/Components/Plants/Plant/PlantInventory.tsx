import React, { Component, FunctionComponent } from "react";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
} from "@material-ui/core";
import { withStyles, Card, CardMedia } from "@material-ui/core";

//not used- keeping for reference for the moment.

const StyledCard = withStyles({
  root: {
    maxWidth: 345,
  },
})(Card);

const StyledCardMedia = withStyles({
  root: {
    height: 200,
  },
})(CardMedia);

type plantInv = {
  id: number;
  locationId: number;
  plantName: string;
  plantType: string;
  sunRequirement: string;
  waterNeeds: string;
  plantCare: string;
  addItem: (id: number, quantity: number) => void;
  handleOpen: () => void;
  handleClose: () => void;
  modalOpen: boolean;
  quantity: number;
};

const PlantInventory: FunctionComponent<plantInv> = (props) => {
  let quantity = 1;

  const updateQuantity = (newQuantity: any) => {
    quantity = newQuantity;
  };
  const mapQuantity = () => {
    let arr = [];
    for (let i = 1; i <= props.quantity; i++) {
      arr.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return arr;
  };

  return (
    <Container key={props.id}>
      <StyledCard>
        <CardActionArea onClick={() => props.handleOpen()}>
          <StyledCardMedia title={props.plantName} />
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
          <Button
            size="small"
            color="primary"
            style={{ marginTop: 16, width: "50%" }}
            onClick={() => props.addItem(props.id, quantity)}
          >
            Add to Cart
          </Button>
          <FormControl style={{ width: "50%" }}>
            <InputLabel style={{ textAlign: "right" }}>Quantity</InputLabel>
            <Select onChange={(e) => updateQuantity(e.target.value)}>
              {mapQuantity()}
            </Select>
          </FormControl>
        </CardActions>
      </StyledCard>
    </Container>
  );
};

export default PlantInventory;
