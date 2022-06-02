import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const MovieCrew = ({ data }) => {
  const buildActorCard = (actor, i) => {
    const actorPic = "https://image.tmdb.org/t/p/original" + actor.profile_path;
    return (
      /*       <div className="actor-card" key={i}>
        {actor.profile_path && (
          <img className="actor-image" src={actorPic} alt="actor-pic" />
        )}
        <p className="actor-name">{actor.name}</p>
        <p className="actor-character">as {actor.character}</p>
      </div> */
      <Card sx={{ minWidth: 150 }} className="actor-card" key={i}>
        <CardMedia component="img" height="200" image={actorPic} alt="" />
        <CardContent>
          <p style={{ color: "whitesmoke" }}>{actor.name}</p>
          <p>{actor.character}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="movie-crew-container">
      <div className="actor-container">
        {data.cast.map((actor, i) => buildActorCard(actor, i))}
      </div>
    </div>
  );
};

export default MovieCrew;
