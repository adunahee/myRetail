const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const priceSchema = {
  type: "object",
  properties: {
    price: { type: "number" },
    currency_code: { type: "string" },
    product_id: { type: "string" },
  },
  required: ["price", "currency_code", "product_id"],
  additionalProperties: false,
};

function validatePriceJSON(price) {
  const validate = ajv.compile(priceSchema);
  const valid = validate(price);
  if (!valid) return validate.errors;
}

module.exports = { validatePriceJSON };
