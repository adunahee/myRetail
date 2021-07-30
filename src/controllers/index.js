const { fetchProduct } = require("../services");
const { readProductPrice, upsertPrice } = require("../dao");
const { validatePriceJSON } = require("../util");

const productController = {
  getProductById: [validateGetById, getProductAndPrice],
  updatePrice: [validatePrice, updatePrice],
};

function validateGetById(req, res, next) {
  const { id } = req.params;
  req.params.validatedId = parseInt(id);
  // perhaps too restrictive, id is returned as string afterall
  if (isNaN(parseInt(id))) {
    const e = new Error("Invalid product Id");
    e.status = 400;
    next(e);
  }
  next();
}

function validatePrice(req, res, next) {
  const { price } = req.body;
  try {
    let errors = validatePriceJSON(price);
    if (errors) {
      res.status(400).send(errors);
    } else {
      next();
    }
  } catch (e) {
    console.log("An unexpected error occurred while validating price.");
    next(e);
  }
}

async function getProductAndPrice(req, res, next) {
  const { id } = req.params;
  try {
    const product = fetchProduct(id);
    const price = readProductPrice(id);
    const values = await Promise.all([product, price]);
    if (values[0] && !values[1]) {
      console.log("No price found.  Adding default record.");
      values[1] = await upsertPrice({ product_id: id });
    }
    values[0].price = values[1];
    res.send(values[0]);
  } catch (e) {
    next(e);
  }
}

async function updatePrice(req, res, next) {
  const { price } = req.body;
  const { product_id } = price;
  try {
    const updatedPrice = await upsertPrice(price);
    res.send(updatedPrice);
  } catch (e) {
    next(e);
  }
}

module.exports = { productController };
