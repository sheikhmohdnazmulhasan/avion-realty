const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: String,
    wpNum: String,
    bio: String,
    specializes: String,
    languagesSpeak: String,
    reraID: String,
    about: String,
    role: String,
    properties: Number,
    designation: String,
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
