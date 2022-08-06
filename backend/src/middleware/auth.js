const isAdmin = (req, res, next) => {
  throw new Error("isAdmin: Not implemented");
};

const isUserFromParam = (param) => (req, res, next) => {
  throw new Error("isUserFromParam: Not implemented");
};

const isValidUserLogin = (req, res, next) => {
  throw new Error("isValidUserLogin: Not implemented");
};

const oneOf = (first, second) => (req, res, next) => {
  throw new Error("oneOf: Not implemented");
};

export default {
  isAdmin,
  isUserFromParam,
  isValidUserLogin,
  oneOf,
};
