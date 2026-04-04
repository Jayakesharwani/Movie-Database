import {useEffect, useState} from 'react'
import MovieItem from '../../components/MovieItem'
import Loader from '../../components/Loader'
import {endpoints, API_STATUS} from '../../api'
import './index.css'

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [status, setStatus] = useState(API_STATUS.INITIAL)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getMovies = async () => {
      setStatus(API_STATUS.IN_PROGRESS)
      try {
        const res = await fetch(endpoints.topRated(page))
        const data = await res.json()
        setMovies(data.results || [])
        setStatus(API_STATUS.SUCCESS)
      } catch {
        setStatus(API_STATUS.FAILURE)
      }
    }

    getMovies()
  }, [page])

  return (
    <div className="container">
      {status === API_STATUS.IN_PROGRESS && <Loader />}

      {status === API_STATUS.FAILURE && (
        <div className="failure-view">
          <button type="button" onClick={() => setPage(1)}>
            Retry
          </button>
        </div>
      )}

      {status === API_STATUS.SUCCESS && (
        <>
          <ul className="movies-list">
            {movies.map(movie => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </ul>

          <div className="pagination">
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>{page}</span>
            <button type="button" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TopRated
