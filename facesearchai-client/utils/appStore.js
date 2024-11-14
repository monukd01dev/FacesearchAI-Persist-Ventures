import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
const appStore = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
	},
});

export default appStore;
