import { configureStore } from "@reduxjs/toolkit";
import { pokedexApi } from "./PokedexApi";
import { pokeCartApi } from "./PokeCartApi";
import pokemonReducer from "./pokemonSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokedexApi.reducerPath]: pokedexApi.reducer,
    [pokeCartApi.reducerPath]: pokeCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokedexApi.middleware,
      pokeCartApi.middleware
    ),
});

export default store;
