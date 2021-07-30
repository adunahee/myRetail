const express = require("express");
const router = express.Router();

const { productController } = require("../controllers");
const { errorHandler } = require("../middlewares");

router.get("/products/:id", productController.getProductById, errorHandler);
router.put("/products/:id", productController.updatePrice, errorHandler)

// TODO: put

module.exports = router;
