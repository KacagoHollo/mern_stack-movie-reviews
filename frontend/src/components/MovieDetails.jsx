import React from "react";

const MovieDetails = ({ data, data2 }) => {
  const moviePic = "https://image.tmdb.org/t/p/original" + data.poster_path;
  const backgroundPic =
    "https://image.tmdb.org/t/p/original" + data.backdrop_path;

  const getMainCrew = (member, i, job) => {
    if (member.job === job)
      return (
        <p key={i} className="movie-crew-director">
          {member.name}
        </p>
      );
  };
  return (
    <div
      className="movie-details-background-pic"
      style={{
        backgroundImage: `url(${backgroundPic})`,
        backgroundSize: "cover",
        borderRadius: "10px",
        height: "100vh",
        position: "relative",
        zIndex: "-1",
      }}
    >
      <div className="movie-details-container">
        <img className="movie-details-image" src={moviePic} alt="movie pic" />

        <div className="movie-details-textbox">
          <h2 className="movie-details-title">
            {data.title} ({data.release_date.slice(0, 4)})
          </h2>
          <ul>
            {data.genres.map((genre, i) => (
              <li className="movie-details-genre" key={i + 1}>
                {genre.name}
              </li>
            ))}
            <li className="movie-details-genre" key={0}>
              {data.runtime}m
            </li>
          </ul>
          <h3 className="movie-details-tagline">{data.tagline}</h3>
          <h3>Overview</h3>
          <p className="movie-details-overview">{data.overview}</p>
          <div className="director-container">
            <p>Director:</p>
            {data2.crew.map((member, i) => getMainCrew(member, i, "Director"))}
            <p className="screenplay-text">Screenplay:</p>
            {data2.crew.map((member, i) =>
              getMainCrew(member, i, "Screenplay")
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
