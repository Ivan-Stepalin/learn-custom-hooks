import {createSlice} from "@reduxjs/toolkit"

const friendSlice = createSlice({
	name: "friend",
	initialState: {
		userInfo: {},
	},
	reducers: {
		getUserInfo(state, action) {
			state.userInfo = action.payload.friendsList.find((item) => item.id === Number(action.payload.friendId))
		},
	},
})

export const {getUserInfo} = friendSlice.actions

export default friendSlice.reducer
