import React from "react"
import PropTypes from "prop-types"
import {Navigate, Route, Outlet} from "react-router-dom"

//Описание работы данной функции:
/** ProtectedRoute - HOC который на вход принимает компонент, и возвращает компонент обернутый в другие для корректного отображения на странице
Если пользователь не авторизован его вернет на страницу Логина
Если у пользователя нет доступа к странице его переадресует на домашнюю страницу которая доступна всем
*/
export const ProtectedRoute = ({isLoggedIn, redirectPath = "/login", children}) => {
	if (!isLoggedIn) {
		return <Navigate to={redirectPath} replace />
	}

	return children ? children : <Outlet />
}

ProtectedRoute.propTypes = {
	isLoggedIn: PropTypes.bool,
	children: PropTypes.node,
}
