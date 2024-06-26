import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: [],
  },
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },

    updateAppointment: (state, action) => {
      state.appointment = state.appointment.filter((appointment, i) => {
        return appointment.appointmint_id !== action.payload.appointmint_id;
      });
    },

    addAppointment: (state, action) => {
      state.appointment = state.appointment.map((elem, i) => {
        if (elem.appointment_id == action.payload.appointment_id) {
          return elem.appointment.push(action.payload.appointment);
        }
      });
    },
  },
});
export const { setAppointment, updateAppointment, addAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
