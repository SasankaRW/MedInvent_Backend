const _setCode = (code, httpCode) => ({
    code: code, 
    hc: httpCode, 
  });
  
  const Codes = {
    SUC_CODES: { ..._setCode(1, 200), message: "ok" },
  };
  
  module.exports = { Codes };
  