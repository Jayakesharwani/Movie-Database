import {Link} from 'react-router-dom'
import {IMG_URL} from '../../api'
import './index.css'

const MovieItem = ({movie}) => {
  const img = movie.poster_path
    ? IMG_URL + movie.poster_path
    : 'https://via.placeholder.com/150'

  return (
    <li className="movie-item">
      <img src={img} alt={movie.title} className="movie-img" />
      <p>{movie.title}</p>
      <p>⭐ {movie.vote_average}</p>

      <Link to={`/movie/${movie.id}`}>
        <button type="button">View Details</button>
      </Link>
    </li>
  )
}

export default MovieItem
