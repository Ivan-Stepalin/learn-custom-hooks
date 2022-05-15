import React, {useState} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import PropTypes from "prop-types"
import {fetchAddFriendToList, fetchDeleteFriendFromList} from "../redux/friendsSlice"

export const FriendsListsDialog = ({open, setOpen, relations, friend}) => {
	const dispatch = useDispatch()
	const friends = useSelector((state) => state.friends)

	const [selectedList, setSelectedList] = useState({})

	const handleClose = () => {
		setOpen(false)
		setSelectedList({})
	}

	const handleSubmit = (friend, selectedList) => {
		dispatch(fetchAddFriendToList({nameOfList: selectedList.name, listId: selectedList.id, addUserIds: friend.id})).finally(() =>
			setOpen(false)
		)
	}

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">{"В какой список вы хотите добавить друга?"}</DialogTitle>
			<DialogContent>
				<FormControl fullWidth style={{marginTop: 10}}>
					<InputLabel id="demo-simple-select-label">Список</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={selectedList.id ? selectedList : ""}
						label="Список"
						onChange={(e) => setSelectedList(e.target.value)}>
						{friends.lists
							.filter((list) => !relations.includes(list))
							.map((item) => (
								<MenuItem value={item} key={item.id}>
									{item.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Отмена</Button>
				<Button onClick={() => handleSubmit(friend, selectedList)} autoFocus>
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

FriendsListsDialog.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
	relations: PropTypes.array,
	friend: PropTypes.object,
}
