import { Habit } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const emptyHabit: Habit = {
  id: "",
  name: "",
  description: "",
};

interface HabitState {
  list: Habit[];
  instance: Habit;
  isFormOpen: boolean;
}

const initialState: HabitState = {
  list: [],
  instance: { ...emptyHabit },
  isFormOpen: false,
};

export const habitSlice = createSlice({
  name: "habit",
  initialState: initialState,
  reducers: {
    /**
     * New habit instance
     * @param state
     */
    init: (state) => {
      state.instance = { ...emptyHabit };
      state.isFormOpen = true;
    },
    /**
     * View habit instance
     * @param state
     * @param data
     */
    view: (state, data: PayloadAction<string>) => {
      const index = state.list.findIndex(({ id }) => id === data.payload);

      if (index !== -1) {
        state.instance = state.list[index];
        state.isFormOpen = true;
      }
    },
    /**
     * Close habit form modal
     * @param state
     */
    close: (state) => {
      state.instance = { ...emptyHabit };
      state.isFormOpen = false;
    },
    /**
     * Set habit instance
     * @param state
     * @param data
     */
    set: (state, data: PayloadAction<Habit>) => {
      state.instance = data.payload;
    },
    /**
     * Save habit instance
     * @param state
     * @param data
     */
    save: (state, data: PayloadAction<Habit>) => {
      const habit = data.payload;

      if (habit.id === "") {
        const habit: Habit = {
          // Temporary ID while no backend yet
          id: new Date().toISOString(),
          name: data.payload.name,
          description: data.payload.description,
        };

        state.list.push(habit);
      } else {
        const index = state.list.findIndex(({ id }) => id === data.payload.id);

        if (index !== -1) {
          state.list[index] = data.payload;
        }
      }

      state.isFormOpen = false;
    },
    /**
     * Delete habit instance
     * @param state
     * @param data
     */
    destroy: (state, data: PayloadAction<string>) => {
      const index = state.list.findIndex(({ id }) => id === data.payload);

      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { init, view, close, set, save, destroy } = habitSlice.actions;

export default habitSlice.reducer;
