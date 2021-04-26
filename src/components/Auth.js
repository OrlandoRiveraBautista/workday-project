import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../config/firebase";
import Button from "@material-ui/core/Button";
import User from "./User";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    textTransform: "none",
  },
}));

export default function Auth() {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  const signIn = () => {
    // function for google signin
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider);
    };
    return (
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={signInWithGoogle}
      >
        Please Sign In
      </Button>
    );
  };

  const signOut = () => {
    if (user) {
      return (
        <div className={classes.root}>
          <User user={user} />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
      );
    }
  };

  return (
    <div style={{ marginTop: "8px" }}>{!user ? signIn() : signOut()} </div>
  );
}
