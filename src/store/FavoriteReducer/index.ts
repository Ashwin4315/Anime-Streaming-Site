import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jikanInfo } from "../../types";

type favorite = {
   data:jikanInfo[]
};

const initialFavoriteState:favorite ={data:[]}

 const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initialFavoriteState,
  reducers: {
  
    add(state,action: PayloadAction<jikanInfo>) {
        if (state?.data.find(anime=> anime?.mal_id ===undefined?anime?.id===action?.payload?.id:anime?.mal_id===action?.payload?.mal_id)) {
            return {data:state?.data.filter(anime=>anime?.mal_id ===undefined? anime?.id !== action?.payload?.id:anime?.mal_id !== action?.payload?.mal_id )}
          }
          return {data:[...state.data,action.payload]}

    }
  },
});




export const favoriteReducer = favoriteSlice.reducer
export const { add } = favoriteSlice.actions
