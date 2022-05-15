import axios from "axios"

export const loginAPI = {
	getUserInfo(token) {
		return axios.get(`https://api.vk.com/method/users.get?access_token=${token}&v=5.122`)
	},
}
