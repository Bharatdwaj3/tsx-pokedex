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
const Special = ({id}: Props) => {

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
        <div>
              <div style={{ height: "1200px", width: "100%", backgroundColor: "red", position: "relative", padding: "20px" }}>
                  {/* Top Blue Section */}
                  <div style={{ height: "50%", width: "100%", backgroundColor: "blue", position: "absolute", top: "0", display: "flex" }}>
                      {/* Left Brown Box */}
                      <div style={{ height: "100%", width: "50%", backgroundColor: "brown", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ height: "90%", width: "90%", backgroundColor: "gray", padding: "20px", borderRadius: "10px" }}>
                              <span style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                  <strong style={{ marginRight: "10px" }}>Base Happiness:</strong>
                                  <span>{desc.base_happiness}</span>
                              </span>
                              <div style={{ marginBottom: "10px" }}><strong>Capture Rate: </strong>{desc.capture_rate}</div>
                              <span style={{ display: "block", marginBottom: "10px" }}><strong>Habitat: </strong>{desc?.habitat?.name}</span>
                              <span style={{ display: "block", marginBottom: "10px" }}><strong>Shape: </strong>{desc?.shape?.name}</span>
                              <span style={{ display: "block", marginBottom: "10px" }}><strong>Growth Rate: </strong>{desc?.growth_rate?.name}</span>
                              <span style={{ display: "block", marginBottom: "10px" }}><strong>Generation: </strong>{desc?.generation?.name}</span>
                          </div>
                      </div>

                      {/* Right Purple Box */}
                      <div style={{ height: "100%", width: "50%", backgroundColor: "purple", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ height: "90%", width: "90%", backgroundColor: "gray", padding: "20px", borderRadius: "10px" }}>
                              <span style={{ display: "block", marginBottom: "10px" }}>
                                  <strong>Scientific Name:</strong> {englishGenus.map((sci: Genus, index: number) => (
                                      <span key={index}>
                                          {sci.genus}{index < englishGenus.length - 1 ? ", " : ""}
                                      </span>
                                  ))}
                              </span>
                              <span style={{ display: "block", marginBottom: "10px" }}>
                                  <strong>Common Sight:</strong> {desc?.pal_park_encounters.map((eg: Pal, index: number) => (
                                      <span key={index}>
                                          {eg.area.name}{index < desc.pal_park_encounters.length - 1 ? ", " : ""}
                                      </span>
                                  ))}
                              </span>
                              <span style={{ display: "block", marginBottom: "10px" }}>
                                  <strong>Variations:</strong> {desc?.varieties.map((eg: Variation, index: number) => (
                                      <span key={index}>
                                          {eg.pokemon.name}{index < desc.varieties.length - 1 ? ", " : ""}
                                      </span>
                                  ))}
                              </span>
                              <span style={{ display: "block", marginBottom: "10px" }}>
                                  <strong>Pre-Evolution:</strong> {desc?.evolves_from_species?.name ?? "No pre-evolution"}
                              </span>
                              <span style={{ display: "block", marginBottom: "10px" }}>
                                  <strong>Egg Group:</strong> {desc?.egg_groups.map((eg: Egg, index: number) => (
                                      <span key={index}>
                                          {eg.name}{index < desc.egg_groups.length - 1 ? ", " : ""}
                                      </span>
                                  ))}
                              </span>
                          </div>
                      </div>
                  </div>

                  {/* Bottom Green Section */}
                  <div style={{ height: "50%", width: "100%", backgroundColor: "green", position: "absolute", bottom: "0", padding: "20px" }}>
                      <div style={{ height: "10%", width: "100%", backgroundColor: "orange", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <h1 style={{ margin: "0" }}>Description:</h1>
                      </div>
                      <div style={{ height: "80%", width: "90%", marginLeft: "5%", marginTop: "20px",backgroundColor:"white", padding: "20px", borderRadius: "10px", overflowY: "auto" }}>
                          <span>
                              {englishFlavors.map((flavor: Flavor, index: number) => (
                                  <span key={index}>
                                      {flavor.flavor_text}{index < englishFlavors.length - 1 ? ", " : ""}
                                  </span>
                              ))}
                          </span>
                      </div>
                  </div>
              </div>

              
        </div>
    </>
  )
}

export default Special