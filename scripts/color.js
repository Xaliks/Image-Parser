const func = (code) => {
  return function (text) {
    return `\u001b[${code[0]}m${text}\u001b[${code[1]}m`;
  };
};

module.exports = {
  red: func([31, 39]),
  green: func([32, 39]),
  yellow: func([33, 39]),
  cyan: func([36, 39]),
};
