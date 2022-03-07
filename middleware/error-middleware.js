export default function errorHandler(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
}