import React from "react";

const MovieCrew = ({ data }) => {
  const buildActorCard = (actor, i) => {
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

  const getMainCrew = (member, i, job) => {
    if (member.job === job)
      return (
        <p key={i} className="movie-crew-director">
          {member.name}
        </p>
      );
  };

  return (
    <div className="movie-crew-container">
      <div className="director-container">
        <p>Director:</p>
        {data.crew.map((member, i) => getMainCrew(member, i, "Director"))}
        <p>Screenplay:</p>
        {data.crew.map((member, i) => getMainCrew(member, i, "Screenplay"))}
      </div>
      <div className="actor-container">
        {data.cast.map((actor, i) => buildActorCard(actor, i))}
      </div>
    </div>
  );
};

export default MovieCrew;
