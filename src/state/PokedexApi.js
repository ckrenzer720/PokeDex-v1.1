import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokedexApi = createApi({
  reducerPath: "pokedexApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      query: ({ search = "", type = "", limit = 20, offset = 0 } = {}) => {
        if (search) {
          // Convert search term to lowercase and trim whitespace
          const cleanSearch = search.toLowerCase().trim();
          return `pokemon/${cleanSearch}`;
        }

        if (type) {
          return `type/${type}`;
        }

        return `pokemon?limit=${limit}&offset=${offset}`;
      },
      transformResponse: (response, meta, arg) => {
        // If it's a search result and we get a single Pokemon object, wrap it in the expected format
        if (arg.search && response && response.id) {
          return {
            id: response.id,
            name: response.name,
            url: `https://pokeapi.co/api/v2/pokemon/${response.id}/`,
            sprites: response.sprites,
            ...response,
          };
        }
        return response;
      },
      transformErrorResponse: (response, meta, arg) => {
        // Handle 404 errors for Pokemon search
        if (arg.search && response.status === 404) {
          return {
            status: 404,
            data: {
              message: `Pokemon "${arg.search}" not found. Please check the spelling and try again.`,
            },
          };
        }
        return response;
      },
    }),
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`,
      transformErrorResponse: (response, meta, arg) => {
        if (response.status === 404) {
          return {
            status: 404,
            data: { message: `Pokemon details for "${arg}" not found.` },
          };
        }
        return response;
      },
    }),
    getPokemonSpecies: builder.query({
      query: (name) => `pokemon-species/${name}`,
      transformErrorResponse: (response, meta, arg) => {
        if (response.status === 404) {
          return {
            status: 404,
            data: { message: `Pokemon species for "${arg}" not found.` },
          };
        }
        return response;
      },
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
} = pokedexApi;
