const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    blogImg: { type: String, required: true },
    agentEmail: { type: String, required: true },
    agentName: { type: String, required: true },
    agentImg: { type: String, required: true }

}, { timestamps: true });

const Blog = mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);

export default Blog;