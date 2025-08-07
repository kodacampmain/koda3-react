import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
  selectedPokemon: null,
};

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

const getPokemonThunk = createAsyncThunk(
  "pokemon/get_data",
  async (_, { rejectWithValue }) => {
    try {
      await delay(2000);
      const url = "https://pokeapi.co/api/v2/pokemon?limit=10";
      const response = await fetch(url);
      if (!response.ok) {
        throw { status: response.status };
      }
      const pokemonData = await response.json();
      const result = pokemonData.results.map(async (pokemon, idx) => {
        const obj = {
          name: pokemon.name,
        };
        try {
          const response = await fetch(pokemon.url);
          if (!response.ok) throw response.statusText;
          const pokemonDetail = await response.json();
          const pokemonAbilities = pokemonDetail.abilities.map(
            (abilityItem) => {
              return abilityItem.ability.name;
            },
          );
          Object.assign(obj, {
            abilities: pokemonAbilities,
          });
        } catch (err) {
          const error = new Error(
            `Error Fetching Pokemon Detail at index ${idx}\n${err.status}: ${err.statusText}`,
          );
          throw error;
        }
        return obj;
      });
      return await Promise.all(result);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
const pokemonSlice = createSlice({
  initialState,
  name: "pokemon",
  reducers: {
    selectPokemon: (state, { payload }) => {
      // payload: idx
      state.selectedPokemon = state.pokemons[payload];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPokemonThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getPokemonThunk.fulfilled, (state, { payload }) => {
        state.pokemons = payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPokemonThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        };
        state.isLoading = false;
        state.isFailed = true;
      }),
});

export default pokemonSlice.reducer;
// export const {} = pokemonSlice.actions
// export const getPokemonAction = getPokemonThunk;
export const pokemonActions = {
  ...pokemonSlice.actions,
  getPokemonThunk,
};
