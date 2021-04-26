import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { auth, firebase, firestore } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Reviews from "./Reviews";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
  },
});

function Rate({ business }) {
  const [user] = useAuthState(auth); // getting user
  // rating values
  const [value, setValue] = useState(business.rating);
  const [userRateDoc, setUserRateDoc] = useState(null);
  const [rateDocData, setRateDocData] = useState(null);

  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  const ratingsRef = firestore.collection("ratings"); // accessing database

  useEffect(() => {
    // run when user changes
    if (!user) return setValue(null);
    setUserRateDoc(null); // resetting the user rate doc

    ratingsRef
      .where("uid", "==", user.uid) // check if the user has rated business before
      .where("businessId", "==", business.reference)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          // check if there is any data returned
          const ratingDoc = snapshot.docs[0];
          setUserRateDoc(ratingDoc);
          setRateDocData(ratingDoc.data());
          setValue(ratingDoc.data().rating);
        }
      });

    return () => {
      setValue(null);
    };
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleRating = async (event, value) => {
    if (!user) return signInWithGoogle(); // if user is not signed in, prompt them to signin

    const confirm = window.confirm(
      // confirm the rating
      `Leave a ${value} star rating for ${business.name}?`
    );
    if (!confirm) return;

    setValue(value);

    // Check if the user has already rated business before
    if (userRateDoc) {
      // if user has rated before:
      userRateDoc.ref.update({ rating: value });
      const newRating = business.ratings.map((rate) => {
        if (rate.uid === user.uid) {
          rate.rating = value;
        }
        return rate;
      });
      setRateDocData(newRating[0]);
    } else {
      // First time rating
      const newRatingDoc = {
        // new rating document
        rating: value,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
        businessId: business.reference,
      };

      // Adding new rating document
      ratingsRef.add(newRatingDoc).then(async (docRef) => {
        const userRateDoc = await docRef.get();
        setUserRateDoc(userRateDoc);
        setRateDocData(userRateDoc.data());
      });
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={handleRating}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </div>
      {rateDocData ? (
        <Reviews rateDocData={rateDocData} />
      ) : (
        "Be the first to leave a rating"
      )}
    </div>
  );
}

export default Rate;
