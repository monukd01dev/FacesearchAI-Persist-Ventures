const express = require("express");
const {
	register,
	login,
	checkCredits,
	updateCredits,
	deleteUser,
	createCheckoutSession,
	upgradeToPremium,
	getUserDetails,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.get("/get-user-detials/:id", getUserDetails);
router.post("/login", login);
router.get("/check-credits/:id", checkCredits);
router.put("/update-credits/:id", updateCredits);
router.delete("/delete/:id", deleteUser);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/upgrade/:id", upgradeToPremium);

module.exports = router;
