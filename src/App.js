import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrentLocation } from "./store/action";
import { makeStyles } from "@material-ui/core/styles";

// template components
import Header from "./components/Header";
import Map from "./components/Map";
import Main from "./pages/Main";
import Loading from "./components/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    position: "absolute",
    flexGrow: 1,
    height: "calc(100% - 85px)",
    width: "100%",
    display: "inline-flex",
    overflowY: "hidden",
  },
  contentContainerMobile: {
    position: "absolute",
    flexGrow: 1,
    height: "calc(100% - 85px)",
    width: "100%",
    overflowY: "hidden",
  },
  pageContainer: {
    overflowY: "auto",
    width: "50%",
  },
  pageContainerMobile: {
    overflowY: "auto",
    width: "100%",
    height: "calc(70%)",
  },
  mapContainer: {
    marginLeft: "auto",
    height: "100%",
    width: "50%",
  },
  mapContainerMobile: {
    height: "30%",
    width: "100%",
  },
}));

function App({ setCurrentLocation, currentLocation }) {
  const [deviceWidth, setDeviceWidth] = useState("undefined");
  const classes = useStyles();

  // Check what device they are viewing on
  const getDeviceWidth = () => {
    if (typeof window !== "undefined") {
      setDeviceWidth(window.innerWidth);
    }

    window.addEventListener("resize", () => {
      setDeviceWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setDeviceWidth(window.innerWidth);
      });
    };
  };

  useEffect(() => {
    getDeviceWidth();
  }, []);

  // Change layout based on the device
  const getContentClassName = () => {
    if (deviceWidth > 800) {
      return classes.contentContainer;
    } else {
      return classes.contentContainerMobile;
    }
  };
  const getMapClassName = () => {
    if (deviceWidth > 800) {
      return classes.mapContainer;
    } else {
      return classes.mapContainerMobile;
    }
  };
  const getPageClassName = () => {
    if (deviceWidth > 800) {
      return classes.pageContainer;
    } else {
      return classes.pageContainerMobile;
    }
  };

  // Get current location when app is loaded
  window.onload = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords; // deconstruct coordinates
          setCurrentLocation(latitude, longitude); // setting coords
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <main>
      <Header />
      <div id="contentContainer" className={getContentClassName()}>
        <div className={getPageClassName()}>
          <Main />
        </div>
        <div id="mapContainer" className={getMapClassName()}>
          {currentLocation !== null ? <Map /> : <Loading />}
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return { currentLocation: state.currentLocation };
};

export default connect(mapStateToProps, { setCurrentLocation })(App);
