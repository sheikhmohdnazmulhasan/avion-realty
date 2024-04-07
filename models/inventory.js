const { Schema, default: mongoose } = require("mongoose");

const inventorySchema = new Schema({
    title: String,
    startingPrice: Number,
    propertyType: String,
    area: String,
    developer: String,
    bedroom: Number,
    areaSqFt: Number,
    completion: String,
    views: String,
    agent: String,
    description: String,
    location: String,
    amenities: [String],
    images: [String],
    status: String,
    leads: Number
}, { timestamps: true });

const Inventory = mongoose.models.inventory || mongoose.model('inventory', inventorySchema);

export default Inventory;