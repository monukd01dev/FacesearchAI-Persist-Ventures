const bcrypt = require("bcryptjs");
const pool = require("../config");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//get existing user details
exports.getUserDetails = async (req, res) => {
	const userId = req.params.id;

	try {
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [
			userId,
		]);
		const user = result.rows[0];

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error fetching user details:", error);
		res.status(500).json({ message: "Failed to fetch user details" });
	}
};

// Register a new user
exports.register = async (req, res) => {
	const { firstName, lastName, email, password, plan } = req.body;
	const credits = plan === "premium" ? 25 : 3;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await pool.query(
			"INSERT INTO users (first_name, last_name, email, password, plan, remaining_credits) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[firstName, lastName, email, hashedPassword, plan, credits],
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Registration failed" });
	}
};

// Login a user
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		const user = result.rows[0];

		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({ ...user });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Login failed" });
	}
};

// ! Check user credits
exports.checkCredits = async (req, res) => {
	const userId = req.params.id;

	try {
		const result = await pool.query(
			"SELECT remaining_credits FROM users WHERE id = $1",
			[userId],
		);
		if (result.rows.length) {
			res.json({ remaining_credits: result.rows[0].remaining_credits });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error checking credits" });
	}
};

// Deduct credit after a search
exports.updateCredits = async (req, res) => {
	const userId = req.params.id;

	try {
		const result = await pool.query(
			"UPDATE users SET remaining_credits = remaining_credits - 1 WHERE id = $1 RETURNING remaining_credits",
			[userId],
		);
		res.json({ remaining_credits: result.rows[0].remaining_credits });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating credits" });
	}
};

// DELETE route to delete a user by ID
exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			"DELETE FROM users WHERE id = $1 RETURNING *",
			[id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User deleted successfully", user: result.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error deleting user" });
	}
};

//! PUT route to update user plan to premium and credits to 25
exports.upgradeToPremium = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query(
			"UPDATE users SET plan = $1, remaining_credits = $2 WHERE id = $3 RETURNING *",
			["premium", 25, id],
		);

		if (result.rowCount === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({ message: "User upgraded to premium", user: result.rows[0] });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error upgrading user plan" });
	}
};

//? creating Stripe routes

exports.createCheckoutSession = async (req, res) => {
	const userDetails = req.body;

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "inr",
					product_data: {
						name: "FacesearchAI Premium",
					},
					unit_amount: 84000,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `http://localhost:5173/success/${userDetails.uId}`,
		cancel_url: `http://localhost:5173/failure/${userDetails.uId}`,
	});

	res.json({ id: session.id });
};
