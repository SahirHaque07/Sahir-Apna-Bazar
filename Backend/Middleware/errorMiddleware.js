const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : statusCode;
  res.status(statusCode).send(new Error("description"));
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "Production" ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
