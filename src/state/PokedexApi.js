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
      query: (name) => `pokemon/${name}`, // Fetch details by Pokémon name
    }),
    getPokemonSpecies: builder.query({
      query: (name) => `pokemon-species/${name}`, // Fetch species data
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} = pokedexApi;

// login to add to "team" or "favorites" list, search bar to filter by name or type, sort by name, type, or number, and a button to clear filters
// - Add a search bar to filter Pokémon by name or type X
// - Add a dropdown to sort Pokémon by name, type, or number X
// - Add a button to clear filters
// - Add a button to toggle between grid and list view X
// - Add a button to set the number of Pokémon displayed per page X
// - Add a button to add Pokémon to a "team" or "favorites" list
// - Add a button to login to save the "team" or "favorites" list
// - Add a button to view the "team" or "favorites" list
// - Add a button to view the details of a Pokémon X
