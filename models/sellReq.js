const { Schema, default: mongoose } = require("mongoose");

const sellReqSchema = new Schema({
    status: String,
    name: String,
    email: String,
    phone: String,
    location: String,
    propertyType: String,
    bedroom: String,
    areaSqFt: String,
    unit: String,
    price: String,
    images: {
        passport: String,
        titleDeeds: String,
        images: [String]
    }
}, { timestamps: true });

const SellReq = mongoose.models.sellReq || mongoose.model('sellReq', sellReqSchema);

export default SellReq