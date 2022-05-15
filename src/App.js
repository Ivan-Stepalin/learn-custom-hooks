import React, {useEffect, useState} from "react"
import {theme} from "./Theme"
import {ThemeProvider} from "@mui/material/styles"
import {Box, CssBaseline} from "@mui/material"
import {Route, Routes} from "react-router-dom"
import {Main} from "./pages/Main/Main"
import {useDispatch, useSelector} from "react-redux"
import Cookies from "js-cookie"
import {fecthLoginUser} from "./redux/userSlice"
import {getSessionCookie} from "./utils/cookies"
import {Login} from "./pages/Login/Login"
import {ProtectedRoute} from "./components/ProtectedRoute"
import {CircularProgress} from "@mui/material"
import {Friend} from "./pages/Friend/Friend"
import {fetchGetFriends, fetchGetLists} from "./redux/friendsSlice"

/**компонент  App*/
export const App = () => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const user = useSelector((state) => state.user)

	/**cookie*/
	const sessionCookie = Cookies.get("vkSession")

	//проверка авторизации
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
		if (sessionCookie) {
			dispatch(fecthLoginUser(getSessionCookie()))
			dispatch(fetchGetFriends(user.userInfo.id))
			dispatch(fetchGetLists(user.userInfo.id))
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	}, [user.loggedIn])

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 2}}>
				<CssBaseline />
				{isLoading ? (
					<Box sx={{display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
						<CircularProgress size={100} />
					</Box>
				) : (
					<Routes>
						<Route path={"/login"} element={<Login />} />
						<Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
							<Route exact path={"/"} element={<Main />} />
							<Route exact path={"/friend/:friendId"} element={<Friend />} />
						</Route>
					</Routes>
				)}
			</Box>
		</ThemeProvider>
	)
}
