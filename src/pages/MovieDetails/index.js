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
    <div className="container">
      {status === API_STATUS.IN_PROGRESS && <Loader />}

      {status === API_STATUS.FAILURE && (
        <button type="button" onClick={() => window.location.reload()}>
          Retry
        </button>
      )}

      {status === API_STATUS.SUCCESS && movie && (
        <>
          <h1>{movie.title}</h1>
          <img src={IMG_URL + movie.poster_path} alt="" />
          <p>{movie.overview}</p>

          <h2>Cast</h2>
          <ul className="movies-list">
            {cast.slice(0, 10).map(c => (
              <li key={c.id}>
                <img src={IMG_URL + c.profile_path} alt="" />
                <p>{c.name}</p>
                <p>{c.character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MovieDetails
