const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRoutes); // Use the user routes

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
