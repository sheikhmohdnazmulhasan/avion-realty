const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
    {

        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        photo: String,
        wpNum: String,
        bio: String,
        specialists: String,
        languagesSpeak: String,
        reraId: String,
        about: String,
        role: String,
        designation: String,

    }, { timestamps: true }

);

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;