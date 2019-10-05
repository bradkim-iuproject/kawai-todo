import React from "react"
import PropTypes from "prop-types"
import "./Movie.css"

function Movie({ id, year, title, summary, poster, genres }) {
  return (
    <div className="movie">
      <img src={poster} alt={title} />
      <h1>
        {title} {year}
      </h1>
      <p className="movie_summary" style={{ backgroundColor: "green" }}>
        {summary.slice(0, 50)}
      </p>
      <ul className="movie_genres">
        {genres.map((genre, index) => (
          <li key={index} className="genres_genre">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  poster: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie
