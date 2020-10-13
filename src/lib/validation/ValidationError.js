module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
};
