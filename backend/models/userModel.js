import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		phone: { type: String, required: true, minlength: 2 },
		name: { type: String, required: false },
		avatar: { type: String, required: false },
		activated: { type: Boolean, required: false, default: false },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema, "tech_talk_rooms_users");
