const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
    {
        email: String,
        role: String

    }, { timestamps: true }

);

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;