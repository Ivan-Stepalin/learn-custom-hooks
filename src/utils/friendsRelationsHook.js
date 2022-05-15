import {useState, useEffect} from "react"
import {useSelector} from "react-redux"

export const useFriendRelations = (friend) => {
	const [relations, setRelations] = useState([])
	const friends = useSelector((state) => state.friends)

	useEffect(() => {
		function handleRelationsChange(value) {
			setRelations(value)
		}
		if (friend.lists) {
			const friendLists = friends.lists.filter((list) => {
				if (friend.lists.some((friendList) => friendList === list.id)) {
					return {list}
				}
			})
			handleRelationsChange(friendLists)
		}
	}, [friend])

	return relations
}
