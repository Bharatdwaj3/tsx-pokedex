import axios from "axios";
import { useState, useEffect } from "react";

type Flavor = {
    flavor_text: string;
    language: {
        name: "en",
        url: string
    };
    version: {
        name: string,
        url: string
    };
}
type Genus = {
    genus: string;
    language: {
        name: "en";
        url: string;
    };
};
 type Egg ={
    name: string,
        url: string,
 }
 type Pal={
    area:{
        name:string;
        url:string;
    };
 }
type Variation = {
    is_default:boolean
    pokemon: {
        name: string;
        url: string;
    };
}
type Desc = {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    flavor_text_entries: Flavor[];
    genera: Genus[];
    habitat:{
        name: string,
        url: string,
    };
    shape: {
        name: string,
        url: string,
    };
    evolves_from_species:{
        name:string,
        url:string,
    }
    egg_groups:Egg[];
    color:string;
    pal_park_encounters:Pal[];
    varieties: Variation[];
    growth_rate:{
        name:string,
        url:string,
    }
    generation:{
        name:string,
        url:string,
    }
};

type Props = {
    id: string;
};
const Species = ({id}: Props) => {

    const [desc, setDesc] = useState<Desc | null>(null);

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

        axios
            .get<Desc>(url)
            .then((response) => {
                setDesc(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon data:", error);
            });
    }, [id]);
    if (!desc) {
        return <div>Loading...</div>;
    }
    const englishFlavors: Flavor[] = desc.flavor_text_entries.filter(
        (entry) => entry.language.name === "en"
    );
    const englishGenus: Genus[] = desc.genera.filter(
        (entryo) => entryo.language.name === "en"
    );
  return (
    <>
        <div id="sect-ein"style={{height: "33.3%",width: "100%",padding: "20px",}}>
        <div style={{fontFamily: "fantasy",fontSize: "1.5rem",fontStyle: "italic",marginBottom: "10px",}}>
            Description:
        </div>
            <div style={{ fontFamily: "cursive",fontSize: "1.5rem",}}>
                {[...new Set(englishFlavors.map((flavour: Flavor) => flavour.flavor_text)),].map((uniqueFlavour, index) => (
                    <p key={index} style={{ fontSize: "0.9rem", margin: "5px 0" }}>
                        {uniqueFlavour}
                    </p>
                ))}
            </div>
        </div>
        
        <div id="sect-zein"style={{height: "33.3%",width: "100%",backgroundColor: "red",position: "relative",}}>
            <div style={{height:"10%",width:"100%",position:"absolute",left:"0"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Scientific Name: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {englishGenus.map((sci : Genus , index : number ) => (
                    <span key={index}>
                        {sci.genus}{index<englishGenus.length-1 ? "," : ""}
                    </span>
                  ))}
                  </span>
                </div>
            </div>
            <div style={{height:"10%",width:"100%",position:"absolute",left:"0",top:"50px"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Common Sight: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.pal_park_encounters.map((eg: Pal , index : number ) => (
                    <span key={index}>
                        {eg.area.name}{index<desc.pal_park_encounters.length-1 ? "," : ""}
                    </span>
                  ))}
                  </span>
                </div>
            </div>
            <div style={{height:"10%",width:"100%",position:"absolute",left:"0",top:"100px"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Pre-Evolution : 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.evolves_from_species?.name??"No pre-evolution"}
                  </span>
                </div>
            </div>
            <div style={{height:"10%",width:"100%",position:"absolute",left:"0",top:"150px"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Egg Group: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.egg_groups.map((eg: Egg , index : number ) => (
                    <span key={index}>
                        {eg.name}{index<desc.egg_groups.length-1 ? "," : ""}
                    </span>
                  ))}
                  </span>
                </div>
            </div>
            <div style={{height:"10%",width:"100%",position:"absolute",left:"0",top:"200px"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Variations :  
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.varieties.map((eg:Variation , index : number ) => (
                    <span key={index}>
                        {eg.pokemon.name}{index<desc.varieties.length-1 ? ", " : ""}
                    </span>
                  ))}
                  </span>
                </div>
                <div style={{height:"10%",width:"100%",position:"absolute",left:"0",top:"50px"}}>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Capture Rate: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.capture_rate}
                  </span>
                </div>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Habitat: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.habitat?.name}
                  </span>
                </div>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Shape: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.shape?.name}
                  </span>
                </div>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Growth Rate: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.growth_rate?.name}
                  </span>
                </div>
                <div style={{fontFamily:"fantasy",fontSize:"1.5rem",fontStretch:"3px",fontStyle:"italic",marginLeft:"20px",marginTop:"20px"}}>Generation: 
                  <span style={{fontFamily:"serif",fontSize:"1.5rem",padding:"90px"}}>
                    {desc?.generation?.name}
                  </span>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Species