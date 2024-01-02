const express = require("express")

const {createUser, deleteUser , userLogin, getAllUsers , updateUser} = require("../controler/userControler")

const router = express.Router();

router.post("/create",createUser)

router.delete("/delete/:id",deleteUser)

router.post("/login",userLogin)

router.get("/allusers", getAllUsers)

router.put("/update/:id",updateUser)


module.exports = router;

