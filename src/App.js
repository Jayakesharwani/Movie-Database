import {Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Popular from './pages/Popular'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import MovieDetails from './pages/MovieDetails'
import Search from './pages/Search'

const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/search/:query" component={Search} />
    </Switch>
  </>
)

export default App
