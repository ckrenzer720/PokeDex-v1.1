import { configureStore } from "@reduxjs/toolkit";
import { pokedexApi } from "./state/PokedexApi";
import pokemonReducer from "./state/pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokedexApi.reducerPath]: pokedexApi.reducer, // Add RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokedexApi.middleware), // Add RTK Query middleware
});

export default store;
