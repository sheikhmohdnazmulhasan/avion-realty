const { Schema, default: mongoose } = require("mongoose");

const podcastSchema = new Schema({ title: String, description: String, agent: String, videoUrl: String });

const Podcast = mongoose.models.Podcasts || mongoose.model('Podcasts', podcastSchema);

export default Podcast;