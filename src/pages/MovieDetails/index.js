import {useEffect, useState} from 'react'
import Loader from '../../components/Loader'
import {endpoints, API_STATUS, IMG_URL} from '../../api'
import './index.css'

const MovieDetails = props => {
  const {match} = props
  const {id} = match.params

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [status, setStatus] = useState(API_STATUS.INITIAL)

  useEffect(() => {
    const getDetails = async () => {
      setStatus(API_STATUS.IN_PROGRESS)
      try {
        const res1 = await fetch(endpoints.movieDetails(id))
        const data1 = await res1.json()

        const res2 = await fetch(endpoints.cast(id))
        const data2 = await res2.json()

        setMovie(data1)
        setCast(data2.cast || [])
        setStatus(API_STATUS.SUCCESS)
      } catch {
        setStatus(API_STATUS.FAILURE)
      }
    }

    getDetails()
  }, [id])

  return (
    <div className="movie-details-container">
      {status === API_STATUS.IN_PROGRESS && <Loader />}

      {status === API_STATUS.FAILURE && (
        <div className="error-view">
          <button type="button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {status === API_STATUS.SUCCESS && movie && (
        <>
          <div className="movie-header">
            <img
              src={IMG_URL + movie.poster_path}
              alt={movie.title}
              className="movie-poster"
            />

            <div className="movie-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>

          <h2 className="cast-heading">Top Cast</h2>

          <ul className="cast-list">
            {cast.slice(0, 10).map(c => (
              <li key={c.id} className="cast-card">
                <img
                  src={IMG_URL + c.profile_path}
                  alt={c.name}
                  className="cast-img"
                />
                <p className="cast-name">{c.name}</p>
                <p className="cast-character">{c.character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MovieDetails
