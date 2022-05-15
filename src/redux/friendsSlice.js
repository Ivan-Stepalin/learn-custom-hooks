import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {friendsAPI} from "../pages/Main/mainAPI"

export const fetchGetFriends = createAsyncThunk("friends/fetchGetFriends", async (userId) => {
	const response = await friendsAPI.getFriends(userId)
	return new Promise((resolve, reject) => {
		if (!response.data.error) {
			resolve(response.data.response)
		} else reject()
	})
})

export const fetchDeleteFriendFromList = createAsyncThunk("friends/fetchDeleteFriendFromList", async (params) => {
	const response = await friendsAPI.deleteFriendFromList(params.nameOfList, params.listId, params.deleteUserIds)
	return new Promise((resolve, reject) => {
		if (!response.data.error) {
			resolve(params)
		} else reject()
	})
})

export const fetchAddFriendToList = createAsyncThunk("friends/fetchAddFriendToList", async (params) => {
	const response = await friendsAPI.addFriendToList(params.nameOfList, params.listId, params.addUserIds)
	return new Promise((resolve, reject) => {
		if (!response.data.error) {
			resolve(params)
		} else reject()
	})
})

export const fetchGetLists = createAsyncThunk("friends/fetchLists", async (userId) => {
	const response = await friendsAPI.getFriendsLists()
	return new Promise((resolve, reject) => {
		if (!response.data.error) {
			resolve(response.data.response)
		} else reject()
	})
})

const friendsSlice = createSlice({
	name: "friends",
	initialState: {
		friends: [],
		loading: false,
		lists: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchGetFriends.pending, (state) => {
			state.loading = true
		})

		builder.addCase(fetchGetFriends.fulfilled, (state, action) => {
			state.friends = action.payload.items
			state.loading = false
		})

		builder.addCase(fetchGetFriends.rejected, (state) => {
			alert(`При загрузке списка друзей что-то пошло не так`)
			state.loading = false
		})

		builder.addCase(fetchGetLists.pending, (state) => {
			state.loading = true
		})

		builder.addCase(fetchGetLists.fulfilled, (state, action) => {
			state.lists = action.payload.items
			state.loading = false
		})

		builder.addCase(fetchGetLists.rejected, (state) => {
			alert(`При загрузке списков друзей что-то пошло не так`)
			state.loading = false
		})

		builder.addCase(fetchDeleteFriendFromList.pending, (state) => {
			state.loading = true
		})

		builder.addCase(fetchDeleteFriendFromList.fulfilled, (state, action) => {
			state.friends = state.friends.map((friend) => {
				if (friend.id === action.payload.deleteUserIds) {
					return {...friend, lists: friend.lists.filter((item) => item !== action.payload.listId)}
				}
				return friend
			})
			state.loading = false
		})

		builder.addCase(fetchDeleteFriendFromList.rejected, (state) => {
			alert(`что-то пошло не так`)
			state.loading = false
		})

		builder.addCase(fetchAddFriendToList.pending, (state) => {
			state.loading = true
		})

		builder.addCase(fetchAddFriendToList.fulfilled, (state, action) => {
			state.friends = state.friends.map((friend) => {
				if (friend.id === action.payload.addUserIds) {
					return {...friend, lists: friend.lists ? [...friend.lists, action.payload.listId] : [action.payload.listId]}
				}
				return friend
			})
			state.loading = false
		})

		builder.addCase(fetchAddFriendToList.rejected, (state) => {
			alert(`что-то пошло не так`)
			state.loading = false
		})
	},
})

export const {} = friendsSlice.actions

export default friendsSlice.reducer
