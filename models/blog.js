const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema({ title: String, description: String, img: String });

const Blog = mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);

export default Blog;