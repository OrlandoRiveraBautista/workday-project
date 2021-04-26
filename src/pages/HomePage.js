import React from "react";

// components
import BusinessListing from "../components/BusinessListing";
import SearchOptions from "../components/SearchOptions";

export default function MainPage() {
  return (
    <div>
      <SearchOptions />
      <BusinessListing />
    </div>
  );
}
