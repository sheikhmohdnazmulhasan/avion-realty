const { Schema, default: mongoose } = require("mongoose");

const propertySchema = new Schema({ propertyName: String }, { timestamps: true });

const PropertyItem = mongoose.models.PropertyItems || mongoose.model('PropertyItems', propertySchema);

export default PropertyItem;