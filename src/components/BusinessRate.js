import React from "react";
import Rate from "./Rate";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function BusinessRate({ business }) {
  return (
    <Container>
      <Typography variant="h6">Leave a review:</Typography>
      <Rate business={business} />
    </Container>
  );
}

export default BusinessRate;
