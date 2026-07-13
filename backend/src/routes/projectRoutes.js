const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const {

    createProject,

    getProjects,

    updateProject,

    deleteProject,

} = require("../controllers/projectController");

router.post(

    "/",

    authenticate,

    createProject

);

router.get(

    "/",

    authenticate,

    getProjects

);

router.put(

    "/:id",

    authenticate,

    updateProject

);

router.delete(

    "/:id",

    authenticate,

    deleteProject

);

module.exports = router;