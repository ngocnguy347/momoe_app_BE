

const loginmiddleware = require("../middleware/login.middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
	// Getting the user details by id
	app.get("/user/:id", loginmiddleware, controller.user);

	// Follow a user
	app.put("/follow", loginmiddleware, controller.follow);

	// UnFollow a user
	app.put("/unfollow", loginmiddleware, controller.unfollow);

	// Update the profile picture
	// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
	app.put("/update-picture", loginmiddleware, controller.updatePicture);
	app.put("/update-avatar", loginmiddleware, controller.updateAvatar);
	app.put("/update-bio", loginmiddleware, controller.updateBio);

	// Search for a user by username
	app.post("/users-research", controller.userSearch);
};
