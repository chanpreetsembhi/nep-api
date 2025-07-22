const errorHandler = (err, req, res) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
};
