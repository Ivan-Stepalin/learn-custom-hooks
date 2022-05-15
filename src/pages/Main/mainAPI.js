import axios from "axios"
import {getSessionCookie} from "../../utils/cookies"

export const friendsAPI = {
	getFriendsLists() {
		return axios.get(`https://api.vk.com/method/friends.getLists?access_token=${getSessionCookie()}&v=5.122`)
	},

	getFriends(userId) {
		return axios.get(
			`https://api.vk.com/method/friends.get?user_ids=${userId}&fields=nickname,online,photo_100,online,list_id,sex&access_token=${getSessionCookie()}&v=5.122`
		)
	},

	deleteFriendFromList(nameOfList, listId, deleteUserIds) {
		return axios.post(
			`https://api.vk.com/method/friends.editList?name=${nameOfList}&list_id=${listId}&delete_user_ids=${deleteUserIds}&access_token=${getSessionCookie()}&v=5.122`
		)
	},

	addFriendToList(nameOfList, listId, addUserIds) {
		return axios.post(
			`https://api.vk.com/method/friends.editList?name=${nameOfList}&list_id=${listId}&add_user_ids=${addUserIds}&access_token=${getSessionCookie()}&v=5.122`
		)
	},
}
