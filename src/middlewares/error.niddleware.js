const ErrorMiddleware = (err, req, res, next) => {
  console.log(err);

  res.status(err.status || 500).json({
    message: err.message || "INTERNAL SERVER ERROR",
  });
};

export default ErrorMiddleware;
