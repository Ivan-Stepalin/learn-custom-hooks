import {createTheme} from "@mui/material/styles"
import SourceSansProReg from "./assets/fonts/SourceSansPro-Regular.ttf"
import SourceSansProBold from "./assets/fonts/SourceSansPro-SemiBold.ttf"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export const theme = createTheme({
	palette: {
		background: {
			default: "#F3F5F6;",
		},
		primary: {
			main: "#004D98",
		},
		secondary: {
			main: "#CF1322",
		},
	},
	props: {
		//смена иконки на компоненте селект
		MuiSelect: {
			IconComponent: ExpandMoreIcon,
		},
	},

	typography: {
		fontFamily: '"SourceSansPro-Regular", sans-serif',
		h1: {
			fontWeight: "600",
			fontSize: "30px",
			lineHeight: "130%",
			color: "#FFF",
		},
		h2: {
			/**Хедер страницы */
			fontWeight: "600",
			fontSize: "24px",
			lineHeight: "32px",
			color: "#2E2E2E",
			display: "inline-block",
			// whiteSpace: "nowrap",
		},

		h3: {
			/**Загловок карточек*/
			fontWeight: "600",
			fontSize: "20px",
			lineHeight: "32px",
			color: "#1F1F1F",
			letterSpacing: "0.15px",
		},
		h4: {},
		h5: {},

		h6: {
			/**Основной текст*/
			fontWeight: "400",
			fontSize: "14px",
			lineHeight: "130%",
			color: "#000000",
		},

		h7: {
			fontWeight: "400",
			fontSize: "16px",
			lineHeight: "130%",
			color: "#000000",
			letterSpacing: "0.15px",
		},

		h8: {
			fontWeight: "600",
			fontSize: "16px",
			lineHeight: "130%",
			color: "#000000",
			letterSpacing: "0.15px",
		},

		subtitle1: {
			/**Субзаголовок (серый)*/
			fontWeight: "600",
			fontSize: "14px",
			lineHeight: "32px",
			letterSpacing: "0.15px",
			color: "#89A8C6",
		},
		subtitle2: {
			fontWeight: "400",
			fontSize: "12px",
			lineHeight: "130%",
			letterSpacing: "0.15px",
			color: "#89A8C6",
		},

		button: {
			textTransform: "none",
			outline: "none",
			fontWeight: "600",
			fontSize: "14px",
			lineHeight: "24px",
		},
	},

	overrides: {
		MuiCssBaseline: {
			"@global": {
				"@font-face": [SourceSansProReg, SourceSansProBold],
			},
		},

		MuiDrawer: {
			root: {
				minHeight: "100vh",
			},
		},

		//тема простых кнопок
		MuiButton: {
			root: {
				borderRadius: "64px",
				boxShadow: "none",
				"& > .MuiTouchRipple-root span": {
					backgroundColor: "inherit",
					color: "inherit",
				},
			},
			contained: {
				padding: "6px 16px",
				background: "#004D98",
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
				"&:hover": {
					backgroundColor: "#004385 !important",
				},
			},
			outlined: {},
			text: {},
		},
	},
})
