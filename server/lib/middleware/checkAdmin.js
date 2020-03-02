module.exports = () => {
	return function(req, res, next) {
		if (req.user.isAdmin) {
			return next();
		}
		req.session.returnTo = req.originalUrl;
		res.redirect("/auth/login");
	};
};
