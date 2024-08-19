import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Species from "../helpers/Species";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

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
  let { id } = useParams<Params>();
  const [PokeDetail, setPokeDetail] = useState<Poke | null>(null);

  useEffect(() => {
    if (id) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

      axios
        .get(url)
        .then((response) => {
          setPokeDetail(response.data);
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
      <div>
        <div>
          <div style={{
            height: "1350px", width: "100%", position: "relative", background: "radial-gradient( skyblue, navy)"
}}>
            <div style={{ height: "90px", width: "100%", borderTop: "5px solid black",  position: "absolute",top:"0" }}>
              <div>
                <h1 style={{textAlign:"center",fontFamily:"sans",color:"black",marginTop:"12px"}}>{PokeDetail?.name.toUpperCase()}</h1>
              </div>
            </div>
            <div style={{ height: "400px", width: "100%", position: "absolute", top: "70px",marginBottom:"20px" }}>
              <div style={{ height: "330px", width: "30%", position: "absolute", left: "0",marginLeft:"450px" ,marginTop:"20px",marginBottom:"20px",borderRadius:"400px"}}>
                <img src={PokeDetail.sprites.front_default} alt={PokeDetail.name} style={{ objectFit: "cover", height: "100%", marginLeft: "50px" }} />
              </div>
            </div>
            <div style={{ height: "850px", width: "100%",  position: "absolute", bottom: "0" }}>
              <div style={{ height: "300px", width: "100%",  position: "absolute", top: "0" }}>
                <div style={{ height: "100%", width: "30%", position: "absolute", left: "0", marginRight: "20px", marginLeft: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" , marginBottom: "20px", background: "linear-gradient(to bottom, navy,white)" }}>
                  <span style={{ height: "30%", width: "100%", backgroundColor: "gray", position: "absolute", top: "0", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <h1 style={{ textAlign: "center", marginTop: "20px", fontWeight: "0.2rem", fontFamily: "serif", color: "white" }}>Height: </h1>
                  </span>
                  <span style={{ height: "70%", width: "100%", position: "absolute", bottom: "0", marginLeft: "20px"}}>
                    <h1 style={{ textAlign: "center", marginTop: "30px", fontWeight: "10", fontSize: "7rem" }}> {PokeDetail.height} ft</h1>
                  </span>
                </div>
                <div style={{ height: "100%", width: "33.3%", position: "absolute", left: "450px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px",  background: "linear-gradient(to bottom, navy,white)" }}>
                  <span style={{ height: "30%", width: "100%", backgroundColor: "gray", position: "absolute", top: "0", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <h1 style={{ textAlign: "center", marginTop: "20px", fontWeight: "0.2rem", fontFamily: "serif",color: "white" }}>Weight: </h1>
                  </span>
                  <span style={{ height: "70%", width: "100%", position: "absolute", bottom: "0",  }}>
                    <h1 style={{ textAlign: "center", marginTop: "30px", fontWeight: "10", fontSize: "6rem" }}> {PokeDetail.weight} lbs</h1>
                  </span>
                </div>
                <div style={{ height: "100%", width: "30%", position: "absolute", right: "0", background: "linear-gradient(to bottom, navy,white)", marginLeft: "20px", marginRight: "20px",  borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                  <div style={{ height: "100%", width: "90%", marginRight: "20px", }}>
                    <span style={{ height: "30%", width: "100%", position: "absolute", top: "0", backgroundColor: "gray", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                      <h1 style={{ textAlign: "center", marginTop: "20px", fontWeight: "0.2rem", fontFamily: "serif",color:"white" }}>Types: </h1>
                    </span>
                    <div
                      style={{
                        height: "70%",
                        width: "395px",
                        position: "absolute",
                        bottom: "0",
                        padding: "20px", 
                        marginLeft: "20px",
                      }}
                    >
                      <table style={{ height: "10px" ,width: "90%", color: "white", borderCollapse: "collapse" }}>

                        <tbody>
                          {PokeDetail.types.map((typo: Type, index: number) => (
                            <tr key={index}>
                              <td
                                className="table-warning"
                                style={{
                                  textAlign: "center",
                                  fontSize: "1.2rem",
                                  borderColor: "black",
                                  borderBottomWidth: "2px",
                                 
                                }}
                              >
                                {typo.type.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>

                </div>
              </div>
            </div>
            <div style={{ height: "300px", width: "100%",  position: "absolute", bottom: "0" }}>
              <div style={{ height: "100%", width: "50%",  position: "absolute", left: "0" }}>
                <div style={{ marginLeft: "30px", height: "400px", width: "90%", backgroundColor: "black", position: "absolute", top: "-180px", borderRadius: "20px" }}>
                  <StatChart stats={PokeDetail.stats} />
                </div>
              </div>
              <div style={{ height: "100%", width: "50%",  position: "absolute", right: "0", }}>
                <div style={{ marginLeft: "30px", height: "100%", width: "90%",  position: "absolute", top: "-130px"}}>
                  <div style={{ height: "100%", width: "300px", background: "linear-gradient(to bottom, navy,white)", position: "absolute", left: "0", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <span style={{ height: "20%", width: "100%", backgroundColor:"gray",position: "absolute", top: "0", marginBottom:"20px" ,borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}}>
                      <h1 style={{ textAlign: "center", marginTop: "20px", fontWeight: "0.2rem" ,}}>Ablities: </h1>
                    </span>
                    <span style={{ height: "70%", width: "100%", position: "absolute", bottom: "0", }}>
                      <table style={{ height: "10px", width: "90%", color: "white", borderCollapse: "collapse", marginLeft: "12px" }}>

                        <tbody>
                          {PokeDetail.abilities.slice(0, 7).map((typo: Ability, index: number) => (
                            <tr key={index}>
                              <td
                                className="table-warning"
                                style={{
                                  textAlign: "center",
                                  fontSize: "1rem",
                                  borderColor: "black",
                                  borderBottomWidth: "2px",

                                }}
                              >
                                {typo.ability.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </span>
                  </div>
                  <div style={{ height: "100%", width: "300px", marginLeft: "190px", background: "linear-gradient(to bottom, navy,white)", position: "absolute", right: "0", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                    <span style={{ height: "20%", width: "100%", backgroundColor: "gray", position: "absolute", top: "0", marginBottom: "20px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                      <h1 style={{ textAlign: "center", marginTop: "20px", fontWeight: "0.2rem" }}>Moves: </h1>
                    </span>
                    <span style={{ height: "70%", width: "100%",  position: "absolute", bottom: "0" }}>
                      <table style={{ height: "10px", width: "90%", color: "white", borderCollapse: "collapse", marginLeft: "12px" }}>

                        <tbody>
                          {PokeDetail.moves.slice(0,7).map((typo: Move, index: number) => (
                            <tr key={index}>
                              <td
                                className="table-warning"
                                style={{
                                  textAlign: "center",
                                  fontSize: "1rem",
                                  borderColor: "black",
                                  borderBottomWidth: "2px",
                                  
                                }}
                              >
                                {typo.move.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        {id && <Species id={id} />}
      </div>
    </>
  );
};


  const StatChart = ({ stats }: { stats: Stat[] }) => {
    const data = stats.map((stat) => ({
      subject: stat.stat.name.toUpperCase(),
      A: stat.base_stat,
      fullMark: 150, 
    }));

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Stats" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  };


export default PokeDetails;
