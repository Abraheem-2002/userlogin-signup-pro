const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const { validetoken } = require("../midelware/jwt");

router.post("/createuser",usercontroller.registerusers);
router.get("/getuser",usercontroller.login);
router.put("/updateuser/:id", validetoken , usercontroller.updateuser);
router.delete("/deleteuser/:id" ,validetoken ,usercontroller.delete);


module.exports = router;