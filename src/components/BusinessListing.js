import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "./Loading/Loading";
import BusinessCard from "./BusinessCard";

function BusinessListing({ businesses }) {
  const renderBusinessListing = () => {
    // render the businesses
    if (!businesses) return;

    return businesses.map((business) => {
      // map each business

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

      // return the business card
      return (
        <Link
          key={business.reference}
          style={{ textDecoration: "none" }}
          to={`/${business.reference}`}
        >
          <BusinessCard type={type} imgUrl={imgUrl} business={business} />
        </Link>
      );
    });
  };

  return <div>{businesses ? renderBusinessListing() : <Loading />}</div>;
}

const mapStateToProps = (state) => {
  return {
    businesses: state.businesses,
  };
};

export default connect(mapStateToProps, {})(BusinessListing);
