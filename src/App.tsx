import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from './components/index';
import { PokeDisplay,PokeDetails } from './components/Pokemon/index';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

const App = () => {
  return (
    <Router>
      <Navbar title='navbar' />
      <Routes>
        <Route path="/" element={<PokeDisplay />} />
        <Route path="/:id" element={<PokeDetails />} />
      </Routes>
      <Footer title='footer' />
    </Router>
  );

}

export default App;