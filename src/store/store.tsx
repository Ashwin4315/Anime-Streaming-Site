import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {favoriteReducer} from "./FavoriteReducer";
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer} from 'redux-persist'

const persistConfig = {
  key: 'favorate',
  version:1,
  storage,
}

const reducer = combineReducers({
 favorite:favoriteReducer ,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
 
})



//
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
