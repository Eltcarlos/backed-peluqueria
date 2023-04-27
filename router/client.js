const client = require("../controllers/client");
const { Router } = require("express");

const router = Router();

router.get("/:id", client.getUser);

module.exports = router;
