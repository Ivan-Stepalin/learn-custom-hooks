import React, {useEffect, useState} from "react"
import {Box, Card, CardContent, CardMedia, Chip, Grid, IconButton, Link, Typography} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import PropTypes from "prop-types"
import {useFriendRelations} from "../../utils/friendsRelationsHook"
import {fetchDeleteFriendFromList} from "../../redux/friendsSlice"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import {FriendsListsDialog} from "../../components/FriendsListsDialog"
import {chipColor} from "../../utils/ChipColor"

export const FriendCard = ({friend}) => {
	const dispatch = useDispatch()
	const relations = useFriendRelations(friend)
	const friends = useSelector((state) => state.friends)
	const [open, setOpen] = useState(false)

	const handleDeleteFriendFromList = (nameOfList, listId, deleteUserIds) => {
		dispatch(fetchDeleteFriendFromList({nameOfList: nameOfList, listId: listId, deleteUserIds: deleteUserIds}))
	}

	return (
		<Grid item>
			<Card sx={{display: "flex"}}>
				<Box sx={{display: "flex", flexDirection: "column"}}>
					<CardContent sx={{flex: "1 0 auto"}}>
						<Link href={`/friend/:${friend.id}`} underline="hover">
							<Typography component="div" variant="h5">
								{friend["last_name"]}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary" component="div">
								{friend["first_name"]}
							</Typography>
						</Link>
					</CardContent>
					<Grid container spacing={1} style={{margin: 5}}>
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
					</Grid>
				</Box>
				<CardMedia
					component="img"
					sx={{width: 151}}
					image={friend["photo_100"]}
					alt="Live from space album cover"
					style={{width: 80, height: 80, borderRadius: 40, alignSelf: "center", margin: 10}}
				/>
			</Card>
			{open ? <FriendsListsDialog open={open} relations={relations} setOpen={setOpen} friend={friend} /> : null}
		</Grid>
	)
}

FriendCard.propTypes = {
	friend: PropTypes.object,
}
