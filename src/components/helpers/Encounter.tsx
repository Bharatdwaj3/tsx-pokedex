import axios from 'axios';
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';

type Encount = {
    location_area: {
        name: string;
    };
    version_details: {
        max_chance: number;
        encounter_details: {
            chance: number;
            max_level: number;
            method: {
                name: string;
            };
        }[];
        version: {
            name: string;
        };
    }[];
}[];

type Props = {
    id: string;
};

const Encounter = ({ id }: Props) => {
    const [encount, setEncount] = useState<Encount>([]);

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;

        axios
            .get<Encount>(url)
            .then((response) => {
                setEncount(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Pokémon Encounters:", error);
            });
    }, [id]);

    return (
        <>
            <div>
                <div
                    style={{
                        background: "radial-gradient(blue, gray)",
                        marginLeft: "50px",
                        height: "660px",
                        width: "1260px",
                        marginBottom: "90px",
                    }}
                >
                    <div className="pt-5">
                        <div className="container text-justify">
                            <div className="col-12">
                                <div className="row">
                                        <div >
                                        {/*{encount.map((location, index) => (
                                                <div key={index}>
                                                    <h5>Location Name: {location.location_area.name}</h5>
                                                    {location.version_details.map((versionDetail, vIndex) => (
                                                        <div key={vIndex}>
                                                            <p>Version: {versionDetail.version.name}</p>
                                                            <p>Max Chance: {versionDetail.max_chance}%</p>
                                                            {versionDetail.encounter_details.map((encounterDetail, eIndex) => (
                                                                <div key={eIndex}>
                                                                    <p>Encounter Method: {encounterDetail.method.name}</p>
                                                                    <p>Chance: {encounterDetail.chance}%</p>
                                                                    <p>Max Level: {encounterDetail.max_level}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}*/}
                                        <Accordion defaultActiveKey="0">
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Encounter;
