/*
 * App -> Router
 */
const express = require("express");
const router = express.Router();

const ctrl = require("./user.ctrl");

// # TDD-1 GET
router.get("/", ctrl.index);

router.get("/:id", ctrl.show);

// # TDD-2 DELETE
router.delete("/:id", ctrl.destroy);

// # TDD-3 POST
router.post("/", ctrl.create);

// # TDD-4 PUT
router.put("/:id", ctrl.update);

module.exports = router;
