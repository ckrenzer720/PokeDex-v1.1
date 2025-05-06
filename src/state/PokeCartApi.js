import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeCartApi = createApi({
  reducerPath: "pokeCartApi",
  tagTypes: ["MyCart"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9009/api/",
  }),
  endpoints: (builder) => ({
    getPokemonCollection: builder.query({
      query: () => "pokemons",
      providesTags: ["MyCart"],
    }),
  }),
});

export const { useGetPokemonCollectionQuery, useAddPokemonMutation } =
  pokeCartApi;
