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

type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: { name: string; url: string };
};

type Move = {
  move: { name: string; url: string };
};

type Poke = {
  name: string;
  height: number;
  weight: number;
  species: { name: string; url: string };
  sprites: { front_default: string };
  stats: Stat[];
  abilities: Ability[];
  moves: Move[];
  types: Type[];
};


const PokeDetails = () => {
  const { id } = useParams<Params>();
  const [PokeDetail, setPokeDetail] = useState<Poke | null>(null);
    useEffect(() => {
    if (id) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

      axios
        .get(url)
        .then((response) => {
          setPokeDetail(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon details:", error);
        });
    }
  }, [id]);

  if (!PokeDetail) {
    return <div>Loading...</div>;
  }

 

  return (
    <>
      <div style={{ backgroundColor: "aqua", height: "2000px", width: "1469px", position: "relative", backgroundImage:"linear-gradient(to left,white,burlywood)" }}>
        <div style={{height: "1830px",width: "1370px",marginLeft: "50px",top: "50px",position: "absolute",}}>
          <div style={{height: "720px",width: "40%",top: 0,right: 0,position: "absolute",}}>
            <div style={{height:"290px",width:"290px",marginLeft:"90px",position:"absolute",top:"190px",	borderBottomRightRadius: "199rem",boxShadow: "2px 122px 15px rgba(0, 0, 0, 0.3)"}}>
              <img style={{height:"240px",width:"240px",position:"absolute",top:"20px",left:"10px"}} src={PokeDetail.sprites.front_default} alt="" />
            </div>
          </div>
          <div style={{height: "720px",width: "60%",top: 0,left: 0,position: "absolute",display: "flex",flexDirection: "column",}}>
            <div id="sect-name" style={{ height: "33.3%", width: "100%" }}>
              <div style={{fontFamily:"fantasy",fontSize:"4.5rem",fontStretch:"3px",marginLeft:"290px",marginTop:"50px",fontStyle:"italic"}}>{PokeDetail.name.toUpperCase()}</div>
            </div>
            <div id="sect-ein" style={{ height: "33.3%", width: "100%",  }}>
              <div style={{height:"10%",width:"50%",position:"absolute",right:"0"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Height: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>{PokeDetail.height}ft</span>
                </div>
              </div>
              <div style={{height:"10%",width:"50%",position:"absolute",left:"0"}}>
                  <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Weight: 
                    <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>{PokeDetail.weight}kg</span>
                  </div>
              </div>
              <div style={{height:"210px",width:"100%",position:"absolute",bottom:"200px"}}>
                 <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Types: 
                    <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                          {PokeDetail.types.map((typo: Type, index: number) => (
                            <span key={index} style={{fontSize: "1.2rem",padding:"12px"}}>
                                {typo.type.name}
                            </span>
                           ))}
                    </span>
                  </div>
                  <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Abilities: 
                    <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                          {PokeDetail.abilities.slice(0,4).map((typo: Ability, index: number) => (
                            <span key={index} style={{fontSize: "1.2rem",padding:"12px"}}>
                                {typo.ability.name}
                            </span>
                           ))}
                    </span>
                  </div>
                  <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Abilities: 
                    <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                          {PokeDetail.moves.slice(0,4).map((typo: Move, index: number) => (
                            <span key={index} style={{fontSize: "1.2rem",padding:"12px"}}>
                                {typo.move.name}
                            </span>
                           ))}
                    </span>
                  </div>
              </div>
            </div>
            <div id="sect-ein" style={{ height: "33.3%", width: "100%" }}>
              <div>
                {id && <Species id={id} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PokeDetails;