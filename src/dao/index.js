const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

// The database to use
const DB_NAME = "myRetail";
const MODEL_NAME = "price";
const PRICING_COLLECTION = "prices";

const PROJECT_STAGE = { _id: 0, __v: 0 };

const setupDb = async () => {
  try {
    await mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("mongo db connected on");
      }
    );
  } catch (e) {
    console.log("Error initalizing mongoDb connection", e);
  }
};
setupDb();

function mongoErrorHandler(err, priceDoc) {
  if (err) {
    throw err;
  }
}

const priceSchema = new mongoose.Schema({
  product_id: String,
  price: { type: Number, default: 9.99 },
  currency_code: { type: String, default: "USD" },
});
const Price = mongoose.model(MODEL_NAME, priceSchema);

async function readProductPrice(productId) {
  const query = {
    product_id: productId,
  };
  const price = await Price.findOne(query, PROJECT_STAGE, mongoErrorHandler);
  return price;
}

async function upsertPrice(updatedPrice) {
  const filter = { product_id: updatedPrice.product_id };
  const options = {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    projection: PROJECT_STAGE,
  };
  let priceDoc = await Price.findOneAndUpdate(
    filter,
    updatedPrice,
    options,
    mongoErrorHandler
  );
  return priceDoc;
}

module.exports = { readProductPrice, upsertPrice };
