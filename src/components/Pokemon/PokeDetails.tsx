import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Species from "../helpers/Species";


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
type Ablities = {
  slot: number;
  is_hidden:boolean;
  ability: {
    name: string,
    url: string,
   };
}
type Moves = {
  type: {
    name: string,
    url: string 
  };
}

type Poke = {
  name: string;
  height: number;
  weight: number;
  species: { name: string };
  sprites: { front_default: string };
  stats: Stat[];
  ablities:Ablities[];
  moves:Moves[];
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
        {/*<div style={{height:"500px",width:"100%",backgroundColor:"red",position:"relative"}}>
            <div style={{ height: "100%", width: "20%", backgroundColor: "green", position: "absolute", left: "0", marginLeft: "20px", marginRight: "20px" }}>
              <div style={{ height: "50%", width: "100%", backgroundColor: "darkkhaki", position: "absolute", top: "0" }}>
                  <div style={{ height: "70%", width: "100%", backgroundColor: "gray", position: "absolute", top: "0" }}>
                    Image
                  </div>
                  <div style={{ height: "30%", width: "100%", backgroundColor: "bisque", position: "absolute", bottom: "0" }}>
                    Image Title
                  </div>
                </div>
              <div style={{ height: "50%", width: "100%", backgroundColor: "darkcyan", position: "absolute", bottom: "0" }}></div>
            </div>
            <div style={{ height: "100%", width: "80%", backgroundColor: "blue", position: "absolute", right: "0", marginLeft: "20px", marginRight: "20px" }}>
              <div style={{ height: "50%", width: "100%", backgroundColor: "orange", position: "absolute", top: "0"}}>
                Descrition
              </div>
              <div style={{ height: "50%", width: "100%", backgroundColor: "yellow", position: "absolute", bottom: "0"}}></div>
            </div>
          </div>*/}
        {id && <Species id={id} />}
       {/* {id && <Species id={id} />}*/}
      </div>
    </>
  );
};

export default PokeDetails;
