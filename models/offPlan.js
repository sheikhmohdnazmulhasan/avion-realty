const { Schema, default: mongoose } = require("mongoose");

const offPlanSchema = new Schema({
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

const OffPlan = mongoose.models.OffPlans || mongoose.model('OffPlans', offPlanSchema);
export default OffPlan;