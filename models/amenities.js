const { Schema, default: mongoose } = require("mongoose");

const amenitiesSchema = new Schema({ name: String, icon: String });

const Amenities = mongoose.models.Amenities || mongoose.model('Amenities', amenitiesSchema);

export default Amenities;