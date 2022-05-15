import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {fecthLoginUser} from "../../redux/userSlice"
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {setSessionCookie} from "../../utils/cookies"

export const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [token, setToken] = useState("")

	return (
		<div style={{display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center"}}>
			<FormControl>
				<InputLabel htmlFor="my-input">Введите токен</InputLabel>
				<Input id="my-input" aria-describedby="my-helper-text" value={token} onChange={(e) => setToken(e.target.value)} />
				<FormHelperText id="my-helper-text">Ваш токен никуда не отправляется</FormHelperText>
				<Button
					disabled={!token.length}
					style={{marginTop: 20}}
					variant={"contained"}
					onClick={() => {
						dispatch(fecthLoginUser(token)).then(() => {
							navigate("/")
						})
					}}>
					Войти
				</Button>
			</FormControl>
		</div>
	)
}
