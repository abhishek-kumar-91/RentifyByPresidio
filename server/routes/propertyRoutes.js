const express = require("express");
const { addProperty, getProperty, deleteProperty, editData } = require("../controller/propertyController");

const router = express.Router();

router.route("/addproperty").post(addProperty);
router.route("/getproperty").get(getProperty);
router.route("/delete/:id").delete(deleteProperty);
router.route("/edit/:id").put(editData)


module.exports = router