import {createSlice} from "@reduxjs/toolkit"
export const providerSlice = createSlice({
    name: "provider",
    initialState: {
        provider: [],
    },
    reducers: {
      setProvider: (state, action) => {
        state.provider = action.payload;
      },

      updateProvider: (state, action) => {
        state.provider = state.provider.map((elem, i) => {
          if (elem.users_id == action.payload.users_id) {
            elem = action.payload.history;
          }
          return elem;
        });
      },
      addProvider: (state, action) => {
        // 
      },
    },
  });
  export const {setProvider,updateProvider,addProvider} = providerSlice.actions
  export default providerSlice.reducer;