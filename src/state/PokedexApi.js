import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokedexApi = createApi({
  reducerPath: "pokedexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: () => "pokemon?limit=900",
    }),
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`, // Fetch details by Pokémon name
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokedexApi;
