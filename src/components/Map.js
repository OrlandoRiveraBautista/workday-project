import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Circle } from "@react-google-maps/api";
import { updateBusinesses } from "../store/action";
import { connect } from "react-redux";

import Loading from "./Loading/Loading";
import Markers from "./Markers";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"]; // google libraries

function Map({
  updateBusinesses,
  currentLocation,
  currentProximity,
  businessType,
}) {
  const { isLoaded } = useJsApiLoader({
    // intiating google maps
    googleMapsApiKey: process.env.REACT_APP_googleMapsApiKey,
    libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!currentLocation || !currentProximity || !map) return;
    const callback = (results, status) => {
      if (status === "OK" && updateBusinesses) return updateBusinesses(results);
    };
    // Initiate Google Maps service
    const service = new window.google.maps.places.PlacesService(map);
    // Config to get businesses nearby
    const request = {
      location: new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      ),
      radius: `${currentProximity}`,
      type: [businessType],
    };
    service.nearbySearch(request, callback);
  }, [map, currentLocation, currentProximity, businessType]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      onLoad={onLoad}
      onUnmount={onUnmount}
      zoom={12}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      <Markers />
      <Circle
        center={currentLocation}
        radius={1000}
        options={{ fillColor: "#2050b3", strokeColor: "#2050b3" }}
      />
    </GoogleMap>
  ) : (
    <Loading />
  );
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation,
    currentProximity: state.currentProximity,
    businessType: state.businessType,
  };
};

export default connect(mapStateToProps, { updateBusinesses })(Map);
