const handleHttpError = (res, error) => {
  console.log('Error', error);
  return res.status(500).send({
    message: 'ERROR',
    error,
  });
};

/**
 * Handle return error specify
 * @param {*} res - send a response
 * @param {string} message - The message error.
 * @param {number} code  - The status code.
 */
const handleErrorResponse = (res, message, code) => {
  console.log('Error', message);
  return res.status(code).send({
    error: message,
  });
};

module.exports = { handleHttpError, handleErrorResponse };
