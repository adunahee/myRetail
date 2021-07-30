# myRetail Application
Is a RESTful service that can retrieve product and price details by ID. And set prices for a product in a mongodb. The two endpoints are
- GET http://localhost:3000/api/products/13860428
- PUT http://localhost:3000/api/products/13860428

The GET response is also the same JSON expected for PUT when updating price. See samplePriceData.json for more details.

## Local Setup
1. Fork and clone this repository.
1. Set up a mongoDb using mongo atlas. [Guide](https://docs.atlas.mongodb.com/getting-started/)
1. Create a local .env file and paste this information from your mongo account:
```
PORT=3000
REDSKY_URL=https://redsky.target.com/v3/pdp/tcin/{1}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&key=candidate
TODO mongo
```
5. Run the following commands with latest node/npm installed
```bash
npm install 
npm run start
```
6. Run npm run test 
## Considerations
Before deploying address the following.
1. Restrict access to price setting endpoint. 
1. Determine default prices, currently anything without a price has it set to 9.99.

