module.exports = {
  errMsg: (msg, code) => {
    const error = new Error(msg);
    if (code) error.statusCode = code;
    return error;
  }
};
