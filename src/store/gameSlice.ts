import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchGameData, type IGameData, type IPuzzleEntity } from "../api/data";

interface IGameState extends IGameData {
  loading: boolean;
  error: string | null;
}

const initialState: IGameState = {
  currentPuzzle: { puzzle: [], grid: { col: 0, row: 0 } },
  currentPuzzleEntities: {},
  entitySelected: null,
  isGameEnded: false,
  entityAmount: 0,
  correctEntityAmount: 0,
  loading: false,
  error: null,
};

/** async thunk for fetching game data */
export const fetchGameDataAsync = createAsyncThunk(
  "game/fetchGameData",
  async () => {
    const response = await fetchGameData();
    return response;
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectEntity: (state, action: PayloadAction<IPuzzleEntity | null>) => {
      state.entitySelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGameDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchGameDataAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch game data";
      });
  },
});

export const { selectEntity } = gameSlice.actions;
export default gameSlice.reducer;
