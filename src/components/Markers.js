import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoWindow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Markers({ businesses }) {
  const [selected, setSelected] = useState(null);
  const classes = useStyles();

  const renderMarkers = () => {
    // render markers
    if (!businesses) return;

    return businesses.map((business) => {
      // get each business in the list
      const { lat, lng } = business.geometry.location; // get business location deconstructed
      const { place_id } = business; // get business id deconstructed

      return (
        // return the markers
        <Marker
          key={place_id}
          onClick={() => setSelected(business)}
          position={{ lat: lat(), lng: lng() }}
        />
      );
    });
  };

  const renderInfoWindow = () => {
    // render infor window
    return (
      <InfoWindow
        position={{
          lat: selected.geometry.location.lat(),
          lng: selected.geometry.location.lng(),
        }}
        onCloseClick={() => setSelected(null)}
      >
        <div className={classes.infoWindow}>
          <Avatar
            src={
              selected.photos && selected.photos.length > 0
                ? selected.photos[0].getUrl()
                : ""
            }
          />
          <Typography variant="h6">{selected.name}</Typography>
          <Typography variant="body2">{selected.vicinity}</Typography>
        </div>
      </InfoWindow>
    );
  };

  return (
    <React.Fragment>
      {businesses ? renderMarkers() : null}
      {selected ? renderInfoWindow() : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    businesses: state.businesses,
  };
};

export default connect(mapStateToProps, {})(Markers);
