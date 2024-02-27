const { Schema, default: mongoose } = require("mongoose");

const areaSchema = new Schema({ itemName: String, itemImg: String }, { timestamps: true });

const AreaItem = mongoose.models.AreaItems || mongoose.model('AreaItems', areaSchema);

export default AreaItem;