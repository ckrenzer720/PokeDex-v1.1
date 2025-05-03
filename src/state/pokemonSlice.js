import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
  },
  reducers: {
    setPokemonList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
