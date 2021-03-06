# Technical Assessment Case Studies

The purpose of the Case Study is not only to gauge your technical ability, but also to see how you think. We will talk through your results here and your logic. The Case Study is not a make or break your candidacy for the role, but serve as a single data-point among your overall qualifications.

For the case study you choose please meet the following requirements:

- Complete the exercise in the technical stack of your choice.
  - When appropriate use a data store of your choice.
  - Use any external frameworks you desire
  - Be ready to discuss your recommendations to make your solution suitable for use in a production environment

- Provide evidence of the result to the interviewers _(choose one)_
  - Unit test results or other documented output
  - Hosted instance of the implementation
  - Runnable instance of the implementation on your computer

- The end result should be a functional implementation of the problem with associated tests
  - Provide the working code either in a publicly accessible hosted repository or a zip file containing all necessary build steps and dependencies
  - Rename .js files to .js.txt if emailing code
  - Provide a README.md file with instructions for testing, running and interacting with your application and any details you feel are relevant to share

# myRetail RESTful service

myRetail is a rapidly growing company with HQ in Richmond, VA and over 200 stores across the east coast. myRetail wants to make its internal data available to any number of client devices, from myRetail.com to native mobile apps.

The goal for this exercise is to create an end-to-end Proof-of-Concept for a products API, which will aggregate product data from multiple sources and return it as JSON to the caller.

Your goal is to create a RESTful service that can retrieve product and price details by ID. The URL structure is up to you to define, but try to follow some sort of logical convention.

Build an application that performs the following actions:

- Responds to an HTTP GET request at /products/{id} and delivers product data as JSON (where {id} will be a number.

Example product IDs: 13860428, 54456119, 13264003, 12954218)

- Example response: {&quot;id&quot;:13860428,&quot;name&quot;:&quot;The Big Lebowski (Blu-ray) (Widescreen)&quot;,&quot;current\_price&quot;:{&quot;value&quot;: 13.49,&quot;currency\_code&quot;:&quot;USD&quot;}}
- Performs an HTTP GET to retrieve the product name from an external API. (For this exercise the data will come from redsky.target.com, but let&#39;s just pretend this is an internal resource hosted by myRetail) 
- Example: [https://redsky.target.com/v3/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk\_ship,rating\_and\_review\_reviews,rating\_and\_review\_statistics,question\_answer\_statistics&amp;key=candidate](https://redsky.target.com/v3/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics&amp;key=candidate#_blank)
- Reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response. 
- BONUS: Accepts an HTTP PUT request at the same path (/products/{id}), containing a JSON request body similar to the GET response, and updates the product&#39;s price in the data store. 
