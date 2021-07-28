const axios = require("axios");

const readProduct = async (productId) => {
  const baseUrl = process.env.REDSKY_URL;
  if (!baseUrl) {
    const e = new Error("Base Url is missing.");
    e.status(500);
    throw e;
  }
  try {
    const finalUrl = baseUrl.replace('{1}', productId);
    const response = await axios.get(finalUrl);
    return response.data;
  } catch (e) {
    e.status = e.response.status ? e.response.status : 500;
    throw e;
  }
};

module.exports = { readProduct };
