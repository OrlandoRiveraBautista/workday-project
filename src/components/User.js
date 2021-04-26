import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function User({ user }) {
  return (
    <div style={{ display: "inline", marginRight: "8px" }}>
      {user ? (
        <Avatar style={{ display: "inline-block" }} src={user.photoURL} />
      ) : (
        ""
      )}
    </div>
  );
}
