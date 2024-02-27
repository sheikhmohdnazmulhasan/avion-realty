const { Schema, default: mongoose } = require("mongoose");

const devSchema = new Schema({ devName: String }, { timestamps: true });

const DevItem = mongoose.models.devItmes || mongoose.model('devItmes', devSchema);

export default DevItem