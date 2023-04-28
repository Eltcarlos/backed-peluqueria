const { Router } = require("express");
const product = require("../controllers/product");

const router = Router();

router.get("/products", product.getAllProducts);
router.get("/products/pagination", product.getAllProductsPagination);
router.get("/:id", product.getProduct);
router.get("/search/:name", product.getProductByName);

module.exports = router;
