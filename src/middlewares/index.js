const GENERIC_MSG = "An unexpected error occurred.";

function errorHandler(err, req, res, next) {
  return res
    .status(err.status ? err.status : 500)
    .send(err.message ? err.message : GENERIC_MSG);
}

module.exports = { errorHandler, GENERIC_MSG };
