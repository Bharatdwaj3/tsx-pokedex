import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Navbar, Search } from './components/index';
import { PokeDisplay } from './components/Pokemon';


const App = () => {
  return (
    <Router>
      <Navbar title='navbar' />
      <Search title='search' />
      <Routes>
        <Route path="/" element={<PokeDisplay />} />
      </Routes>
      <Footer title='footer' />
    </Router>
  );

}

export default App;