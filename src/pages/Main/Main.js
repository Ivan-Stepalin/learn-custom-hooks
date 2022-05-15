import {useDispatch, useSelector} from "react-redux"
import React, {useEffect, useState} from "react"
import {Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Grid, Typography} from "@mui/material"
import {fetchGetFriends, fetchGetLists} from "../../redux/friendsSlice"
import {useNavigate} from "react-router-dom"
import {logoutUser} from "../../redux/userSlice"
import {FriendCard} from "./FriendCard"

export const Main = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [pageLoading, setPageLoading] = useState(true)

	const user = useSelector((state) => state.user)
	const friends = useSelector((state) => state.friends)

	useEffect(() => {
		if (friends.friends.length) {
			setPageLoading(false)
		}
	}, [friends.friends])

	const handleLogout = () => {
		navigate("/login")
		dispatch(logoutUser())
	}

	return (
		<>
			<Button onClick={handleLogout}>Выйти</Button>
			<Typography variant={"h3"} style={{marginBottom: 20}}>
				Добро пожаловать
			</Typography>
			{!pageLoading ? (
				friends.friends.length > 0 ? (
					<Grid container spacing={2} justifyContent={"center"}>
						{friends.friends.map((item) => (
							<FriendCard friend={item} key={item.id} />
						))}
					</Grid>
				) : null
			) : (
				<Box sx={{display: "flex", height: "70vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
					<CircularProgress size={100} />
				</Box>
			)}
		</>
	)
}
