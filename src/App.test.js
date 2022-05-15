import {render} from "@testing-library/react"
import "@testing-library/jest-dom"
import {Provider} from "react-redux"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import React from "react"
import {MemoryRouter} from "react-router-dom"
import developmentData from "./pages/Development/API/development.json"
import {App} from "./App"

//делаем копия хранилища редакса для тестирования
const mockStore = configureMockStore([thunk])

describe("Тестирование страницы: План развития сотрудников", () => {
	const store = mockStore({
		development: {
			developer: developmentData[0],
			developers: developmentData,
		},
	})

	const Application = () => (
		<MemoryRouter initialEntries={["/development"]}>
			<Provider store={store}>
				<App />
			</Provider>
		</MemoryRouter>
	)

	it("Проверка на  рендер приложения", () => {
		const tree = render(<Application />)
		//проверка на количество строк на странице
		expect(tree).toMatchSnapshot()
	})
})
