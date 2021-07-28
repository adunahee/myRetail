function errorHandler(err, req, res, next) {
  // TODO: handle different error scenarios
  res.status(err.status).send(err.message);
}

module.exports = { errorHandler };
