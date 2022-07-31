/**
 *
 * @author Ngoc Nguyen 20176836 "Momoe app" <nguy0304@gmail.com>
 * GitHub repo: https://github.com/
 *
 */
const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.user = (req, res) => {
	User.findOne({ _id: req.params.id })
		.select("-Password")
		.then((user) => {
			Post.find({ PostedBy: req.params.id })
				.populate("PostedBy", "_id Name")
				.sort({ createdAt: -1 })
				.exec((err, result) => {
					if (err) return res.status(422).json();
					const posts = [];
					result.map((item) => {
						posts.push({
							_id: item._id,
							Title: item.Title,
							Body: item.Body,
							Photo: item.Photo.toString("base64"),
							PhotoType: item.PhotoType,
							Likes: item.Likes,
							Comments: item.Comments,
							Followers: item.Followers,
							Following: item.Following,
							Hashtags: item.Hashtags,
							PostedAt: item.PostedAt,
						});
					});
					res.json({ user, posts });
				});
		})
		.catch((err) => {
			return res.status(404).json({ Error: "User not found" });
		});
};

exports.follow = (req, res) => {
	User.findByIdAndUpdate(
		req.body.followId,
		{
			$push: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$push: { Following: req.body.followId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
};

exports.unfollow = (req, res) => {
	User.findByIdAndUpdate(
		req.body.unfollowId,
		{
			$pull: { Followers: req.user._id },
		},
		{
			new: true,
		},
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: err });
			}
			User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: { Following: req.body.unfollowId },
				},
				{ new: true }
			)
				.select("-Password")
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(422).json({ error: err });
				});
		}
	);
};

exports.updateBio = (req, res) => {
	console.log("req.body: ", req.body)
	User.findByIdAndUpdate(
		req.user._id,
		{
			$set: { 
				Fullname: req.body.fullname,
				Address: req.body.address 
			},
		},
		{
			new: true,
		}
	).select("-Password")
	.then((result) => {
		res.json(result);
	})
	.catch((err) => {
		return res.status(422).json({ error: err });
	});;	
}

exports.updateAvatar = (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{ $set: { Avatar: req.body.avatar, } },
		{ new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: "pic canot post" });
			}
			res.json(result);
		}
	);
};


// Just Wrote the logic of it but not yet tested and the client implementation doesn't exist yet
exports.updatePicture = (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{ $set: { Photo: req.body.Photo, PhotoType: req.body.PhotoType } },
		{ new: true },
		(err, result) => {
			if (err) {
				return res.status(422).json({ error: "pic canot post" });
			}
			res.json(result);
		}
	);
};

exports.userSearch = (req, res) => {
	let pattern = new RegExp("^" + req.body.pattern);
	User.find({ Name: { $regex: pattern } })
		.select("_id Email Name")
		.then((user) => {
			res.json({ user });
		})
		.catch((err) => {
			console.log(err);
		});
};
