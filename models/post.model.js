
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
console.log(mongoose.Schema.Types)
const postSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Body: {
			type: String,
			required: true,
		},
		Hashtags: {
			type: Array,
			required: true,
		},
		Photo: {
			type: Buffer,
			default: "no photo",
		},
		PhotoType: {
			type: String,
		},
		PostedBy: {
			type: ObjectId,
			ref: "User",
		},
		PostedAt: {
			type: String,
			ref: "User",
		},
		Likes: [{ type: ObjectId, ref: "User" }],
		Comments: [
			{
				Text: String,
				PostedBy: {
					type: ObjectId,
					ref: "User",
				},
			},
		],
	},
	{ timestamps: true }
);


// Create a model from our schema
module.exports = mongoose.model("Post", postSchema);
