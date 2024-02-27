const { Schema, default: mongoose } = require("mongoose");

const propertySchema = new Schema({ propertyName: String, propertyImg: String }, { timestamps: true });

const PropertyItem = mongoose.models.PropertyItem || mongoose.model('PropertyItems', propertySchema);

export default PropertyItem;