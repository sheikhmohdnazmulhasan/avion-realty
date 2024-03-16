const { Schema, Mongoose, default: mongoose } = require("mongoose");

const podcastSchema = new Schema({ podcast: String, description: String, agent: String, videoUrl: String });
const Podcast = Mongoose.models.Podcast || mongoose.model('Podcast', podcastSchema);

export default Podcast;