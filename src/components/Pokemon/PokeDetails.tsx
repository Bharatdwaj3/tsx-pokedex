import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Encounter from "../helpers/Encounter";

type Params = {
  id: string;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};
type Type = {
  slot: number;
  type: { name: string; url: string };
};

type Poke = {
  name: string;
  height: number;
  weight: number;
  species: { name: string };
  sprites: { front_default: string };
  stats: Stat[];
  types: Type[];
};

const PokeDetails = () => {
  let { id } = useParams<Params>();
  const [PokeDetail, setPokeDetail] = useState<Poke | null>(null);
  useEffect(() => {
    if (id){
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

      axios
        .get(url)
        .then((response) => {
          setPokeDetail(response.data);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
      
  }, [id]);
  if (!PokeDetail) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <div>
          <div>
            <div
              style={{ height: "900px", width: "100%", marginBottom: "50px" }}
            >
              <div
                style={{
                  margin: "50px",
                  height: "900px",
                  width: "full",
                  background: "radial-gradient(blue, gray)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "50%",
                    width: "290px",
                    position: "absolute",
                    borderRadius: "8px",
                    left: "0",
                  }}
                >
                  <img
                    src={PokeDetail.sprites.front_default}
                    style={{
                      objectFit: "contain",
                      borderRadius: "1.5rem",
                      width: "100%",
                      height: "300px",
                    }}
                    alt={PokeDetail.name.toUpperCase()}
                  />
                </div>
                <div
                  style={{
                    height: "100%",
                    marginRight: "35px",
                    width: "890px",
                    position: "absolute",
                    right: "0",
                  }}
                >
                  <div
                    style={{
                      height: "50%",
                      marginRight: "35px",
                      width: "890px",
                      position: "absolute",
                      top: "0",
                    }}
                  >
                    <h1
                      style={{
                        fontFamily: "sans",
                        textAlign: "center",
                        borderBottom: "4px solid black",
                      }}
                    >
                      {PokeDetail.name}
                    </h1>

                    <p>
                      <span
                        style={{ fontFamily: "sans", fontWeight: "bolder" }}
                      >
                        
                        Weight :
                      </span>
                      <span
                        style={{ fontFamily: "serif", fontWeight: "lighter" }}
                      >
                        {PokeDetail.weight}lbs
                      </span>
                    </p>
                    <p>
                      <span
                        style={{ fontFamily: "sans", fontWeight: "bolder" }}
                      >
                        
                        Height :
                      </span>
                      <span
                        style={{ fontFamily: "serif", fontWeight: "lighter" }}
                      >
                        {PokeDetail.height}ft
                      </span>
                    </p>
                    <p>
                      <span
                        style={{ fontFamily: "sans", fontWeight: "bolder" }}
                      >
                        
                        Types :
                      </span>
                      <span
                        style={{ fontFamily: "serif", fontWeight: "lighter" }}
                      >
                        {PokeDetail.types.map((typo, index) => (
                          <span key={index}>
                            {typo.type.name}
                            {index < PokeDetail.types.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {id && <Encounter id={id}  />}
      </div>
    </>
  );
};

export default PokeDetails;
