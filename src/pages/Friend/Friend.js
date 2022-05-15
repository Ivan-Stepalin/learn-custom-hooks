import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useLocation} from "react-router-dom"
import {Avatar, Box, Chip, CircularProgress, Grid, IconButton, Link, Typography} from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {useFriendRelations} from "../../utils/friendsRelationsHook"
import {chipColor} from "../../utils/ChipColor"
import {fetchDeleteFriendFromList} from "../../redux/friendsSlice"
import {FriendsListsDialog} from "../../components/FriendsListsDialog"
import {getUserInfo} from "../../redux/friendSlice"

export const Friend = () => {
	const [open, setOpen] = useState(false)

	const location = useLocation()
	const dispatch = useDispatch()

	const friend = useSelector((state) => state.friend.userInfo)
	const friends = useSelector((state) => state.friends)

	const relations = useFriendRelations(friend)

	const [pageLoading, setPageLoading] = useState(true)

	useEffect(() => {
		if (pageLoading) {
			dispatch(getUserInfo({friendId: location.pathname.replace("/friend/:", ""), friendsList: friends.friends}))
		}
	}, [pageLoading])

	useEffect(() => {
		if (friend.id) {
			setPageLoading(false)
		}
	}, [friend])

	const handleDeleteFriendFromList = (nameOfList, listId, deleteUserIds) => {
		dispatch(fetchDeleteFriendFromList({nameOfList: nameOfList, listId: listId, deleteUserIds: deleteUserIds}))
	}

	return (
		<>
			{pageLoading ? (
				<Box sx={{display: "flex", height: "70vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
					<CircularProgress size={100} />
				</Box>
			) : (
				<Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
					<Grid item>
						<Avatar alt="Remy Sharp" src={friend["photo_100"]} sx={{width: 200, height: 200}} />
					</Grid>
					<Grid item>
						<Typography component="div" variant="h5">
							{`${friend["last_name"]} ${friend["first_name"]}`}
						</Typography>
					</Grid>
					{relations.length
						? relations.map((item) => (
								<Grid item key={item.id}>
									<Chip
										label={item.name}
										color={chipColor(item.name)}
										onDelete={() => handleDeleteFriendFromList(item.name, item.id, friend.id)}
									/>
								</Grid>
						  ))
						: null}
					{friends.lists.length === relations.length ? null : (
						<Grid item>
							<IconButton onClick={() => setOpen(true)}>
								<AddCircleOutlineIcon />
							</IconButton>
						</Grid>
					)}
					{open ? <FriendsListsDialog open={open} relations={relations} setOpen={setOpen} friend={friend} /> : null}
				</Grid>
			)}
		</>
	)
}
