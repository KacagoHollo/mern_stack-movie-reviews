import React from "react";

const MovieCrew = ({ data }) => {
  const buildActorCard = (actor, i) => {
    console.log("ACTOR!");
    const actorPic = "https://image.tmdb.org/t/p/original" + actor.profile_path;
    return (
      <div className="actor-card" key={i}>
        {actor.profile_path && (
          <img className="actor-image" src={actorPic} alt="actor-pic" />
        )}
        <p className="actor-name">{actor.name}</p>
        <p className="actor-character">as {actor.character}</p>
      </div>
    );
  };

  return (
    <div className="movie-crew-container">
      <div className="director-container">
        {data.crew.map(
          (member, i) =>
            member.job === "Director" && (
              <p key={i} className="movie-crew-director">
                Director: {member.name}
              </p>
            )
        )}
        {data.crew.map(
          (member, i) =>
            member.job === "Screenplay" && (
              <p key={i} className="movie-crew-screenplay">
                Screenplay: {member.name}
              </p>
            )
        )}
      </div>
      <div className="actor-container">
        {data.cast.map((actor, i) => buildActorCard(actor, i))}
      </div>
    </div>
  );
};

export default MovieCrew;
