import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import friendsSlice from "./friendsSlice"
import friendSlice from "./friendSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		friends: friendsSlice,
		friend: friendSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

window.store = store
