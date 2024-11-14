import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		uId: 0,
		fname: "Guest",
		lname: "Kumar",
		email: "example@gmail.com",
		plan: "chor",
		credits: 0,
	},
	reducers: {
		setUser: (state, action) => {
			const { id, first_name, last_name, email, plan, remaining_credits } =
				action.payload;
			state.uId = id;
			state.fname = first_name;
			state.lname = last_name;
			state.email = email;
			state.plan = plan;
			state.credits = remaining_credits;
		},
		updateCredits: (state, action) => {
			if (state.credits > 0) {
				console.log(
					`state.credits : ${state.credits}, action.payload : ${action.payload}`,
				);
				state.credits = action.payload - 1;
			}
		},
	},
});

export const { setUser, updateCredits } = userSlice.actions;
export default userSlice.reducer;
