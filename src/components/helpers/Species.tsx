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
            <div> Base Happiness : {desc.base_happiness} </div>
            <div> Caputure Rate : {desc.capture_rate} </div>
            <div>
                <br />
                  <span > Descritption: 
                      {englishFlavors.map((flavor: Flavor, index: number) => (
                          <span key={index}>
                              {flavor.flavor_text}
                              {index < englishFlavors.length - 1 ? ", " : ""}
                          </span>
                      ))}
                  </span>
                  <br />
                  <span>
                      Scientific Name:{" "}
                      {englishGenus.map((sci: Genus, index: number) => (
                          <span key={index}>
                              {sci.genus}
                              {index < englishGenus.length - 1 ? ", " : ""}
                          </span>
                      ))}
                  </span>

            </div>
              <span> Habitat: {desc?.habitat.name}</span>
              <br />
              <span> Shape: {desc?.shape.name}</span>
              <br />
              <span> Growth-Rate: {desc?.growth_rate.name}</span>
              <br />
              <span> Generation: {desc?.generation.name}</span>
              <br />
              <span> Common Sight: {desc?.pal_park_encounters.map((eg: Pal, index: number) => (
                  <span key={index}>
                      {eg.area.name}
                      {index < desc.pal_park_encounters.length - 1 ? ", " : ""}
                  </span>
              ))}</span>
              <br />
              <span> Variations: {desc?.varieties.map((eg: Variation, index: number) => (
                  <span key={index}>
                      {eg.pokemon.name}
                      {index < desc.varieties.length - 1 ? ", " : ""}
                  </span>
              ))}</span>
              <br />
              <span>  Pre-Evolution: {desc?.evolves_from_species?.name ?? "No pre-evolution"}</span>
              <br />
              <span> Egg Group: {desc?.egg_groups.map((eg:Egg,index:number)=>(
                    <span key={index}>
                        {eg.name}
                      {index < desc.egg_groups.length - 1 ? ", " : ""}
                    </span>
              ))}</span>
        </div>
    </>
  )
}

export default Special