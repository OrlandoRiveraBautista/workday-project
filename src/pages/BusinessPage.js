import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// component
import Loading from "../components/Loading/Loading";
import BusinessCard from "../components/BusinessCard";
import BusinessRate from "../components/BusinessRate";

function BusinessPage({ business, type, imgUrl }) {
  return (
    <div>
      <Link exact to="/">
        <Button color="primary">
          <ChevronLeftIcon />
        </Button>
      </Link>

      {business ? (
        <div>
          <BusinessCard type={type} imgUrl={imgUrl} business={business} />
          <BusinessRate business={business} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let { reference } = ownProps.match.params;

  if (!state.businesses) return {}; // mapStateToProps cant return undefined

  const businessIndex = state.businesses.findIndex(
    // getting the business index
    (business) => business.reference === reference
  );

  const business = state.businesses[businessIndex];

  // process business type property: ex: gas_station => Gas Station
  const type = business.types.length
    ? business.types[0]
        .split("_")
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ")
    : "";

  // process business img url
  const imgUrl =
    business.photos && business.photos.length
      ? business.photos[0].getUrl()
      : "";

  return {
    business: business,
    type: type,
    imgUrl: imgUrl,
  };
};

export default connect(mapStateToProps, {})(BusinessPage);
