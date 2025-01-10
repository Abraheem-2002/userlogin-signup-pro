const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");

router.post("/createuser",usercontroller.registerusers);
router.get("/getuser",usercontroller.login);
router.put("/updateuser/:id",usercontroller.updateuser);
router.delete("/deleteuser/:id",usercontroller.delete);


module.exports = router;