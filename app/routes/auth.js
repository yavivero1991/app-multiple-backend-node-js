const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../controllers/auth");
const { validateRegister, validateLogin } = require("../validators/auth");

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);

module.exports = router;
