import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ElevatorResultItem, ElevatorSliceState, ElevatorStates } from "./elevators.types";
import { extractError } from "../common/utils";
import { getAllElevators } from "./elevators.service";
import { RootState } from "../../store";

const initialState: ElevatorSliceState = {
  loading: false,
  elevators: [],
  selectedElevator: null,
  success: false,
  selectedElevatorsTab: null,
  error: null,
};

export const getElevators = createAsyncThunk("elevators/getElevators", async (token: string, thunkAPI) => {
  try {
    return await getAllElevators({ token });
  } catch (error) {
    const message = extractError(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

const elevatorsSlice = createSlice({
  name: "elevators",
  initialState,
  reducers: {
    selectStateTab: (state, { payload: { selectedElevatorState } }: PayloadAction<{ selectedElevatorState: ElevatorStates }>) => {
      state.selectedElevatorsTab = selectedElevatorState;
    },
    selectElevatorItem: (state, { payload: { selectedElevator } }: PayloadAction<{ selectedElevator: ElevatorResultItem }>) => {
      state.selectedElevator = selectedElevator;
    },
    unSelectElevatorItem: (state) => {
      state.selectedElevator = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getElevators.pending, (state) => {
        state.loading = true;
      })
      .addCase(getElevators.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.elevators = action.payload.result;
        state.selectedElevatorsTab = "OPERATIONAL";
      })
      .addCase(getElevators.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.elevators = [];
        state.selectedElevatorsTab = null;
        state.error = action.payload as Error;
      });
  },
});

export const { selectStateTab, selectElevatorItem, unSelectElevatorItem } = elevatorsSlice.actions;

export const selectElevators = (state: RootState) => state.elevators;

export default elevatorsSlice.reducer;
