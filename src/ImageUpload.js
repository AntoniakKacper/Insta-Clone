import { Button } from "@material-ui/core";
import React, { useState } from "react";

import { database, storage } from "./firebase";
import firebase from "firebase";

import "./ImageUpload.css";

export const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  //const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            database.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        value={caption}
        placeholder="Enter a caption..."
        onChange={(event) => {
          setCaption(event.target.value);
        }}
      />
      <input type="file" onChange={handleChange} />
      <Button className="InageIpload__button" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};
