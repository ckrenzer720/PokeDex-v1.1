import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get base URL from environment variable or use default
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9009/api/";

// Custom base query with better error handling
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  })(args, api, extraOptions);

  // Handle fetch errors (network issues, server not running, etc.)
  if (result.error) {
    if (result.error.status === "FETCH_ERROR") {
      // Server is likely not running or unreachable
      console.error("Server connection error:", result.error);
      return {
        ...result,
        error: {
          ...result.error,
          message:
            "Unable to connect to server. Please make sure the server is running on port 9009.",
        },
      };
    }
  }

  return result;
};

export const pokeCartApi = createApi({
  reducerPath: "pokeCartApi",
  tagTypes: ["MyCart", "Favorites"],
  baseQuery: baseQueryWithErrorHandling,
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
