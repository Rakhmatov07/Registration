const { Router } = require("express");
const { register, login, show, showById } = require("../controllers/control.register");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/show", show);
router.get("/showone/:id", showById);
module.exports = router;