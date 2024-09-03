import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Link } from 'react-router-dom';



type Pokemons = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
};

type PokeCardProps = {
  data: Pokemons[];
  pages:string
};

const PokeCard = ({ data,pages }:PokeCardProps) => {
  return (
    <>
      {data.map((pokemon) => (
        <div className="col-3 md-5" key={pokemon.id} style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Link to={`${pages}${pokemon.id}`}>
            <div style={{ height: "350px", width: "100%", background: "radial-gradient(purple, navy)", position: "relative", borderRadius: "1rem" }}>
              <div style={{ height: "300px", width: "100%", position: "absolute", top: "0" }}>
                <img
                  src={pokemon.sprites.front_default}
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    width: "250px"
                  }}
                  alt={pokemon.name}
                />
                <h1 style={{ position: "absolute", left: "0", top: "21px" }} className="badge text-bg-warning">
                  <span style={{ textAlign: "center", fontFamily: "serif", color: "black" }}>{pokemon.weight} lbs</span>
                </h1>
                <h1 style={{ position: "absolute", right: "0", top: "21px" }} className="badge text-bg-warning">
                  <span style={{ textAlign: "center", fontFamily: "serif", color: "black" }}>{pokemon.height} ft</span>
                </h1>
              </div>
              <div style={{ height: "50px", width: "100%", position: "absolute", bottom: "0", background: "gray", borderBottomRightRadius: "1rem", borderBottomLeftRadius: "1rem" }}>
                <h3 style={{ textAlign: "center", fontFamily: "serif", color: "white", fontSize: "1.2rem" }}>{pokemon.name.toUpperCase()}</h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PokeCard;
