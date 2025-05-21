import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokedexApi = createApi({
  reducerPath: "pokedexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: ({ search = "", type = "", limit = 20, offset = 0 } = {}) => {
        if (search) {
          return `pokemon/${search}`;
        }

        if (type) {
          return `type/${type}`;
        }

        return `pokemon?limit=${limit}&offset=${offset}`;
      },
    }),
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonSpecies: builder.query({
      query: (name) => `pokemon-species/${name}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} = pokedexApi;
