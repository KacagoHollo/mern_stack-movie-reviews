import React, { useState } from "react";
import { submitUsername } from "../api/review";

const MovieReviewUsername = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="set-username-container">
      <p>To be able to comment, firts you'll need to setup your username!</p>
      <input
        name="set-username"
        id="set-username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="chose a username!"
      ></input>
      <button
        onClick={() => {
          submitUsername(username);
          //window.location.reload();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default MovieReviewUsername;
