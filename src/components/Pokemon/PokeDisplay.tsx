import { useEffect, useState } from "react";
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

const PokeDisplay = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeDetails, setPokeDetails] = useState<any[]>([]);

  useEffect(() => {
    const getPokemons = async () => {
   
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
        const pokemonList = response.data.results;
        setPokemons(pokemonList);

        const details = await Promise.all(
          pokemonList.map(async (pokemon: Pokemon) => {
            const poke = await axios.get(pokemon.url);
            return poke.data;
          })
        );

        setPokeDetails(details);

    };

    getPokemons();
  }, []);

  return (
    <div>
     
      <div className="py-56">
        <div className="container">
          <div className="row">
            <div className="col-9">
              <div className="row">
                {pokeDetails.map((pokemon, index) => (
                  <div key={index}>
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeDisplay;
