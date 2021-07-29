const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

// The database to use
const DB_NAME = "myRetail";
const MODEL_NAME = "price";
const PRICING_COLLECTION = "prices";

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

const priceSchema = new mongoose.Schema({
  product_id: String,
  price: { type: Number, default: 9.99 },
  currency_code: { type: String, default: "USD" },
});
const Price = mongoose.model(MODEL_NAME, priceSchema);

const readProductPrice = async (productId) => {
  let price;
  const query = {
    product_id: productId,
  };

  await Price.findOne(query, (err, priceDoc) => {
    if (err) {
      throw err;
    }
    price = priceDoc.toJSON();
    delete price._id;
  });
  return price;
};

function updateProductPrice(product) {}

module.exports = { readProductPrice, updateProductPrice };
