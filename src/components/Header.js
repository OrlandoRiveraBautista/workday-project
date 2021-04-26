import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Auth from "./Auth";

export default function Header() {
  return (
    <div>
      <Container>
        <Typography variant="h5">Workday Project</Typography>
        <Divider />
        <Auth />
      </Container>
    </div>
  );
}
