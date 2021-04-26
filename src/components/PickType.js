import React from "react";
import { connect } from "react-redux";
import { setCurrentBusinessType } from "../store/action";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

function PickType({ setCurrentBusinessType, businessType }) {
  const processName = (businessType) => {
    // make the name look pretty
    const name = businessType
      .split("_")
      .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
      .join(" ");
    return name;
  };

  const options = [
    // type options
    "restaurant",
    "gas_station",
    "cafe",
    "book_store",
    "mavie_theater",
    "primary_school",
    "shoe_store",
  ];

  const onRequestTypeChange = (event) => {
    // change the type
    setCurrentBusinessType(event.target.value);
  };

  const renderOptions = () => {
    //   mapped options
    return options.map((type) => {
      const name = processName(type);
      return (
        <MenuItem value={type} key={name} name="requestType">
          {name}
        </MenuItem>
      );
    });
  };

  const renderTypePicker = () => {
    // form picker
    return (
      <FormControl>
        <InputLabel>Select Type</InputLabel>
        <Select value={businessType} onChange={onRequestTypeChange}>
          {renderOptions()}
        </Select>
      </FormControl>
    );
  };

  return businessType ? renderTypePicker() : null;
}

const mapStateToProps = (state) => {
  return {
    businessType: state.businessType,
  };
};

export default connect(mapStateToProps, { setCurrentBusinessType })(PickType);
