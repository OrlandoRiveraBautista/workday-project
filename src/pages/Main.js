import React from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import HomePage from "./HomePage";
import BusinessPage from "./BusinessPage";

export default function Main() {
  return (
    <div>
      <Container>
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:reference" component={BusinessPage} />
        </Router>
      </Container>
    </div>
  );
}
