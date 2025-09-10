import React from "react";
import { useGetPokemonQuery } from "../../state/pokedexApi";
import AddToTeamButton from "./AddToTeamButton";

export default function PokeInfo(props) {
  const { data: pokemon } = useGetPokemonQuery(props.name);

  return (
    <>
      <h2>{props.name.toUpperCase()}</h2>

      <div>
        <img src={pokemon?.sprites["front_default"]} />
      </div>
      <AddToTeamButton
        pokemon={pokemon}
        isAuthenticated={props.isAuthenticated}
        size="medium"
        showText={true}
      />
    </>
  );
}
