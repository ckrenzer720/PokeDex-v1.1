import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeCartApi = createApi({
  reducerPath: "pokeCartApi",
  tagTypes: ["MyCart", "Favorites"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/",
  }),
  endpoints: (builder) => ({
    getPokemonCollection: builder.query({
      query: () => "pokemons",
      providesTags: ["MyCart"],
    }),
    addPokemon: builder.mutation({
      query: (pokemon) => ({
        url: "pokemons",
        method: "POST",
        body: pokemon,
      }),
      invalidatesTags: ["MyCart"],
    }),
    removePokemon: builder.mutation({
      query: (pokemonName) => ({
        url: `pokemons/${pokemonName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyCart"],
    }),
    // Favorites endpoints
    getFavorites: builder.query({
      query: () => "favorites",
      providesTags: ["Favorites"],
    }),
    addFavorite: builder.mutation({
      query: (pokemon) => ({
        url: "favorites",
        method: "POST",
        body: pokemon,
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFavorite: builder.mutation({
      query: (pokemonName) => ({
        url: `favorites/${pokemonName}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetPokemonCollectionQuery,
  useAddPokemonMutation,
  useRemovePokemonMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = pokeCartApi;
