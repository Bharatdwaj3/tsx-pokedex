import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import PokeCard from './PokeCard';

type PokemonSprites = {
  front_default: string;
};

type Pokemon = {
  id: number;
  name: string;
  weight: number;
  sprites: PokemonSprites;
  url:string;
};

type Data = {
  name: string;
  url: string;
};

const PokeDisplay = () => {
  const [data, setData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=24");
        const resultant = response.data.results; // Get the request from the root API

        const urls = resultant.map((item: Data) => item.url); // Collect all the URLs
        const requests = urls.map((url) => axios.get(url)); // Call all the URL promises

        const responses = await Promise.all(requests); // Collect the responses of URL calls
        const detailedData = responses.map((res) => res.data); // Map the new array of responses

        setData(detailedData); // Set the data
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    getPokemon();
  }, []);

  return (
    <div>
      <div className="py-56">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <PokeCard data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeDisplay;
