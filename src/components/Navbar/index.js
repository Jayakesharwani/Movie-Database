import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const history = useHistory()

  const onSearch = () => {
    if (search.trim() !== '') {
      history.push(`/search/${search}`)
      setSearch('')
    }
  }

  return (
    <nav className="nav-bar">
      <h1 className="logo">movieDB</h1>

      <div className="nav-links">
        <Link to="/">Popular</Link>
        <Link to="/top-rated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </div>

      <div className="search-container">
        
        <input
  className="search-input"
  placeholder="Search movies..."
  value={search}
  onChange={e => setSearch(e.target.value)}
/>
        <button type="button" className="search-btn" onClick={onSearch}>
          Search
        </button>
      </div>
    </nav>
  )
}

export default Navbar
