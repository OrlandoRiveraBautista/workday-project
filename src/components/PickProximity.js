import React from "react";
import { connect } from "react-redux";
import { setCurrentProximity } from "../store/action";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

function PickProximity({ setCurrentProximity, currentProximity }) {
  const options = [5, 10, 15, 20]; //distance options

  const onRequestProximityChange = (event) => {
    // handle the change
    setCurrentProximity(event.target.value);
  };

  const renderOptions = () => {
    // map options
    return options.map((distance) => {
      return (
        <MenuItem value={distance} key={distance} name="requestProximity">
          {`${distance} miles`}
        </MenuItem>
      );
    });
  };

  const renderProximityPicker = () => {
    // render the picker
    return (
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Select Distance</InputLabel>
        <Select
          value={Math.floor(currentProximity / 1609)}
          onChange={onRequestProximityChange}
        >
          {renderOptions()}
        </Select>
      </FormControl>
    );
  };

  return currentProximity ? renderProximityPicker() : null;
}

const mapStateToProps = (state) => {
  return {
    currentProximity: state.currentProximity,
  };
};

export default connect(mapStateToProps, { setCurrentProximity })(PickProximity);
