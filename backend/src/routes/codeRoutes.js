const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {

    saveCode,

    getCode,

} = require("../controllers/codeController");

router.put(

    "/:id",

    authenticate,

    saveCode

);

router.get(

    "/:id",

    authenticate,

    getCode

);

module.exports = router;