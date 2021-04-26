import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

// Business Icons
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import TheatersIcon from "@material-ui/icons/Theaters";
import SchoolIcon from "@material-ui/icons/School";
import StoreIcon from "@material-ui/icons/Store";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
    flexGrow: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  large: {
    width: "100%",
    height: theme.spacing(18),
  },
  ratingContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  icon: {
    color: `${theme.palette.primary.main} !important`,
    backgroundColor: "rgba(0,0,0,0) !important",
  },
}));

export default function BusinessCard({ type, imgUrl, business }) {
  const classes = useStyles();

  const getBusinessIcon = () => {
    // determine business type icon
    switch (type) {
      default:
        return <StoreIcon className={classes.icon} />;
      case "Restaurant":
        return <RestaurantMenuIcon className={classes.icon} />;
      case "Gas Station":
        return <LocalGasStationIcon className={classes.icon} />;
      case "Cafe":
        return <LocalCafeIcon className={classes.icon} />;
      case "Book Store":
        return <LocalLibraryIcon className={classes.icon} />;
      case "Movie Theater":
        return <TheatersIcon className={classes.icon} />;
      case "Primary School":
        return <SchoolIcon className={classes.icon} />;
      case "Shoe Store":
        return <StoreIcon className={classes.icon} />;
    }
  };

  return (
    <Card className={classes.card}>
      {imgUrl ? (
        <Avatar className={classes.large} variant="rounded" src={imgUrl} />
      ) : (
        <Typography variant="h5">Image Not Provided</Typography>
      )}
      <Divider />
      <Typography variant="h6">{business.name}</Typography>
      {business.opening_hours && business.opening_hours.open_now ? (
        <Typography color="primary">Open</Typography>
      ) : (
        <Typography color="error">Closed</Typography>
      )}
      <Divider />
      <Container style={{ marginBottom: "8px" }}>
        <div
          style={{
            marginBottom: "8px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography variant="body1" style={{ display: "inline-flex" }}>
            {business.vicinity}
          </Typography>

          <div className={classes.ratingContainer}>
            <StarIcon />{" "}
            <Typography variant="body2" component="span">
              {business.rating}
            </Typography>
          </div>
        </div>

        <Chip
          color="primary"
          avatar={getBusinessIcon()}
          label={type}
          variant="outlined"
          style={{ padding: "8px" }}
        ></Chip>
      </Container>
    </Card>
  );
}
