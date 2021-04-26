import React from "react";
import Container from "@material-ui/core/Container";
import PickType from "./PickType";
import PickProximity from "./PickProximity";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: "space-evenly",
  },
}));

export default function SearchOptions() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <PickType />
      <PickProximity />
    </Container>
  );
}
