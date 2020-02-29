module.exports = () => {
  return function(req, res, next) {
    req.user.isAdmin
      ? next()
      : res.json({ message: `Not authorized for user` });
    
  };
};
