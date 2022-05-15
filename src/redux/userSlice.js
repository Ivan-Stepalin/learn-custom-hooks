import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {removeSessionCookie, setSessionCookie} from "../utils/cookies"
import axios from "axios"
import {loginAPI} from "../pages/Login/loginAPI"

export const fecthLoginUser = createAsyncThunk("user/fetchLoginUser", async (token) => {
	const response = await loginAPI.getUserInfo(token)
	return new Promise((resolve, reject) => {
		if (!response.data.error) {
			resolve({response: response.data.response, token: token})
		} else reject()
	})
})

const userSlice = createSlice({
	name: "user",
	initialState: {
		userInfo: {},
		loggedIn: false,
		loading: false,
	},
	reducers: {
		setUserInfo(state, action) {
			state.userInfo = action.payload
			state.loggedIn = true
		},
		logoutUser(state) {
			state.userInfo = {}
			state.loggedIn = false
			removeSessionCookie()
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fecthLoginUser.pending, (state) => {
			state.loading = true
		})
		builder.addCase(fecthLoginUser.fulfilled, (state, action) => {
			setSessionCookie(action.payload.token)
			state.userInfo = action.payload.response[0]
			state.loading = false
			state.loggedIn = true
		})
		builder.addCase(fecthLoginUser.rejected, (state) => {
			state.loading = false
			alert(`не удалось загрузить данные пользователя`)
		})
	},
})

export const {setUserInfo, logoutUser} = userSlice.actions

export default userSlice.reducer
