import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />

      {/* CONTENT */}
      <div className="movie-card-content">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">⭐ {voteAverage}</p>

        <Link to={`/movie/${id}`}>
          <button type="button" className="view-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieCard
