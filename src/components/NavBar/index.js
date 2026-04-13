import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      {/* Top Row */}
      <div className="nav-top">
        <Link to="/" className="page-logo">
          movieDB
        </Link>

        {/* Hamburger */}
        <button className="hamburger" type="button" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Menu */}
      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>

        {renderSearchBar()}
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
