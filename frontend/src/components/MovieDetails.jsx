import React from "react";

const MovieDetails = ({ data }) => {
  const moviePic = "https://image.tmdb.org/t/p/original" + data.poster_path;
  return (
    <div className="movie-details-container">
      <img className="movie-details-image" src={moviePic} alt="movie pic" />
      <div>
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
        <h3>OVERVIEW</h3>
        <p className="movie-details-overview">{data.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
