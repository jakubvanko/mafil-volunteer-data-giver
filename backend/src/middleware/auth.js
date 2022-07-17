export const isUser = (req, res, next) => {
  // TODO: Check JWT and add to req
  next();
};

export const isAdmin = (req, res, next) => {
  this.isUser(req, res, () => {
    // TODO: Check if admin
    next();
  });
};
