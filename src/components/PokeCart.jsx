import React from "react";
import { useGetPokemonCollectionQuery } from "../../state/pokeCartApi";

export default function PokeCart() {
  const { data: pokemonList } = useGetPokemonCollectionQuery();

  return (
    <div className="pokemon-cart">
      <div className="cart-header">
        <span>Collection</span>
      </div>
      <div>
        <div className="cart-body">
          {pokemonList?.length > 0 ? (
            pokemonList.map((pokemon) => (
              <div key={pokemon.name} style={{ textAlign: "center" }}>
                <img src={pokemon.img} alt={pokemon.name} />
                <span style={{ position: "relative", top: "-20px" }}>
                  {pokemon.name}
                </span>
              </div>
            ))
          ) : (
            <span>No pokemon added!</span>
          )}
        </div>
      </div>
    </div>
  );
}
