const axios = require("axios");

const fetchProduct = async (productId) => {
  const baseUrl = process.env.REDSKY_URL;
  if (!baseUrl) {
    const e = new Error("Base Url is missing.");
    e.status(500);
    throw e;
  }
  try {
    const finalUrl = baseUrl.replace('{1}', productId);
    const response = await axios.get(finalUrl);
    return response.data.product;
  } catch (e) {
    e.status = e.response.status ? e.response.status : 500;
    throw e;
  }
};

module.exports = { fetchProduct };
