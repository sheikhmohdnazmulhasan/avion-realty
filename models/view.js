const { Schema, default: mongoose } = require("mongoose");

const viewSchema = new Schema({ name: String });

const View = mongoose.models.Views || mongoose.model('Views', viewSchema);

export default View;