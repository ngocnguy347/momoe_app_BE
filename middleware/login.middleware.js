
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged In." });
	}
	const token = authorization.replace("Bearer ", "");

	jwt.verify(token, "25091997", (err, payload) => {
		if (err) {
			console.log(err);
			return res.status(401).json({ error: "You session has been expired." });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			// We make user data accessible
			req.user = userdata;
			next();
		});
	});
};
