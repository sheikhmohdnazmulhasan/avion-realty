const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
    {

        name: String,
        email: String,
        photo: String,
        wpNum: String,
        bio: String,
        specialists: String,
        languagesSpeak: String,
        reraId: String,
        about: String,
        role: String

    }, { timestamps: true }

);

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;