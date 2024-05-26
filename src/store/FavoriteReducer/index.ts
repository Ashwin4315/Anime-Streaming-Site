import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { favaprops } from "../../types";

type favorite = {
   data:favaprops[]
};

const initialFavoriteState:favorite ={data:[]}

 const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteState,
  reducers: {
  
    add(state,action: PayloadAction<favaprops>) {
        if (state?.data.find(anime=> anime?.id===action?.payload?.id)) {
            return {data:state?.data.filter(anime=>anime?.id !== action?.payload?.id)}
          }
          return {data:[...state.data,action.payload]}

    }
  },
});




export const favoriteReducer = favoriteSlice.reducer
export const { add } = favoriteSlice.actions
