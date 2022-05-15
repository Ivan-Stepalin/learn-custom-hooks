import Cookies from "js-cookie"

/**добавление Cookies */
export const setSessionCookie = (session) => {
	Cookies.remove("vkSession")
	Cookies.set("vkSession", session, {expires: 1})
}

/**удаление Cookies */
export const removeSessionCookie = () => {
	Cookies.remove("vkSession")
}

/**получение Cookies */
export const getSessionCookie = () => {
	const sessionCookie = Cookies.get("vkSession")

	if (sessionCookie === undefined) {
		return {}
	} else {
		return sessionCookie
	}
}
