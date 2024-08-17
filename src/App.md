```js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer,Navbar,Search } from './components/index';
import {Home} from './pages/index';

const App = () => {
  return (
    <Router>
      <Navbar title='navbar'/>
      <Search title='search'/>
      <Routes>
        <Route path="/" element={<Home title="Welcome to the Homepage!" />} />
      </Routes>
      <Footer title='footer'/>
    </Router>
  );
}

export default App;
```

```js
<div style={{ padding: 0, margin: 0, listStyleType: "none" }}>
          {pokemonData.map((pet, index) => (
            <div key={index} style={{ color: "white" }}>{pet.name}</div>
          ))}
        </div>
```


```js
<h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
```