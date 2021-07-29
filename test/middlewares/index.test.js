const { mockRequest, mockResponse } = require("jest-mock-req-res");
const { errorHandler, GENERIC_MSG } = require("../../src/middlewares");

describe("test suite for errorHandler middleware", () => {
  test("set status and send response called once", () => {
    const { err, req, res, next } = prepareMocks();
    errorHandler(err, req, res, next);
    expect(res.status.mock.calls.length).toBe(1);
    expect(res.send.mock.calls.length).toBe(1);
  });
  test("defaults status and error message", () => {
    const { err, req, res, next } = prepareMocks();
    errorHandler(err, req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(500);
    expect(res.send.mock.calls[0][0]).toBe(GENERIC_MSG);
  });
  test("sends appropriate info about error", () => {
    const { err, req, res, next } = prepareMocks();
    const STATUS_CODE = 400;
    err.status = STATUS_CODE;
    const ERR_MSG = "uh oh";
    err.message = ERR_MSG;
    errorHandler(err, req, res, next);
    expect(res.status.mock.calls[0][0]).toBe(STATUS_CODE);
    expect(res.send.mock.calls[0][0]).toBe(ERR_MSG);
  });
});

const prepareMocks = () => {
  const err = new Error();
  err.status = undefined;
  err.message = undefined;

  const res = mockRequest();
  res.status = jest.fn((statusCode) => res);
  res.send = jest.fn((errorMessage) => {});

  const req = mockResponse();
  const next = () => {};
  return { err, res, req, next };
};
