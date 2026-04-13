import {Component} from 'react'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import './index.css'

class MovieDetails extends Component {
  state = {
    movieData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {id} = match.params

    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'

    try {
      // 🔥 ALL API CALLS
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`

      const [movieRes, creditsRes, videoRes] = await Promise.all([
        fetch(movieUrl),
        fetch(creditsUrl),
        fetch(videoUrl),
      ])

      const movieData = await movieRes.json()
      const creditsData = await creditsRes.json()
      const videoData = await videoRes.json()

      // 🎬 FIND TRAILER
      const trailer = videoData.results.find(
        vid => vid.type === 'Trailer' && vid.site === 'YouTube',
      )

      // ✅ SET STATE
      this.setState({
        movieData: {
          title: movieData.title,
          overview: movieData.overview,
          posterPath: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
          backdropPath: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
          rating: movieData.vote_average,
          duration: movieData.runtime,
          genres: movieData.genres.map(g => g.name),
          releaseDate: movieData.release_date,
          cast: creditsData.cast.slice(0, 12),
          trailerKey: trailer ? trailer.key : null,
        },
        isLoading: false,
      })
    } catch (error) {
      console.error('Error fetching movie details:', error)
      this.setState({isLoading: false})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#e50914" />
    </div>
  )

  renderMovieDetails = () => {
    const {movieData} = this.state

    return (
      <>
        {/* ================= MOVIE SECTION ================= */}
        <div className="movie-details-card">
          <img
            className="movie-poster"
            src={movieData.posterPath}
            alt={movieData.title}
          />

          <div className="movie-content">
            <h1 className="movie-title">{movieData.title}</h1>

            <p className="movie-meta">
              ⭐ {movieData.rating} | {movieData.duration} min
            </p>

            <p className="movie-meta">{movieData.genres.join(', ')}</p>

            <p className="movie-meta">Release Date: {movieData.releaseDate}</p>

            <p className="movie-overview">{movieData.overview}</p>
          </div>
        </div>

        {/* ================= CAST SECTION ================= */}
        <div className="cast-section">
          <h2 className="section-heading">Cast</h2>

          <ul className="cast-list">
            {movieData.cast.map(each => (
              <li key={each.id} className="cast-card">
                <img
                  src={
                    each.profile_path
                      ? `https://image.tmdb.org/t/p/w200${each.profile_path}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt={each.name}
                  className="cast-image"
                />
                <p className="cast-name">{each.original_name}</p>
                <p className="cast-character">{each.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <NavBar />
        <div className="movie-details-container">
          {isLoading ? this.renderLoadingView() : this.renderMovieDetails()}
        </div>
      </>
    )
  }
}

export default MovieDetails
