const { fetchProduct } = require("../services");
const { readProductPrice } = require("../dao");

const productController = {
  getProductById: [validateGetById, fetchProductById, readProductPriceById],
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
    req.productInfo = await fetchProduct(req.params.validatedId);
    next();
  } catch (e) {
    next(e);
  }
}

async function readProductPriceById(req, res, next) {
  try {
    if (!req || !req.productInfo) {
      throw new Error("productInfo not present on request");
    }
    const priceDetails = await readProductPrice(req.productInfo.item.tcin);
    const productWithPriceInfo = Object.assign(req.productInfo, priceDetails);
    res.send(productWithPriceInfo);
  } catch (error) {
    next(error);
  }
}

module.exports = { productController };
