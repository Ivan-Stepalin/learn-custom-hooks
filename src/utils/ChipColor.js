export const chipColor = (nameOfRelations) => {
	switch (nameOfRelations) {
		case "Коллеги":
			return "secondary"
		case "Лучшие друзья":
			return "success"
		case "Родственники":
			return "info"
		case "Друзья по школе":
			return "warning"
	}
}
