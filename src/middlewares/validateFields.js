const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(500);
    return res.send({
      status: 500,
      errors: result.array(),
    });
  }

  next();
};

module.exports = { validateFields };
