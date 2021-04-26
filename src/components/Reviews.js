import React from "react";
import User from "./User";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function Reviews({ rateDocData }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <User user={rateDocData} />
      <Typography
        style={{ marginRight: "12px" }}
        variant="body2"
        component="span"
      >
        {rateDocData.displayName}
      </Typography>
      <Rating readOnly value={rateDocData.rating}></Rating>
    </div>
  );
}
