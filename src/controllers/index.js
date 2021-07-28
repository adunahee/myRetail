const { readProduct } = require("../services");

const productController = {
  getProductById: [validateGetById, fetchProductById],
  updatePrice: [],
};

function validateGetById(req, res, next) {
  const { id } = req.params;
  req.params.validatedId = parseInt(id);
  if (isNaN(parseInt(id))) {
    const e = new Error("Invalid product Id");
    e.status = 400;
    next(e);
  }
  next();
}

async function fetchProductById(req, res, next) {
  try {
    const productInfo = await readProduct(req.params.validatedId);
    res.send(productInfo);
  } catch (e) {
    next(e);
  }
}

module.exports = { productController };
