const { Schema, default: mongoose } = require("mongoose");

const offPlanSchema = new Schema(
  {
    title: String,
    startingPrice: Number,
    propertyType: String,
    area: String,
    developer: String,
    // bedroom: { type: [String], required: true },
    bedroom: [Number],
    bathroom: Number,
    areaSqFt: Number,
    completion: String,
    views: String,
    furnishing: String,
    agent: String,
    description: String,
    location: String,
    amenities: [String],
    images: [String],
    status: String,
    payment: {
      firstInstallment: String,
      underConstruction: String,
      onHandover: String,
      postHandover: String,
    },
    leads: Number,
  },
  { timestamps: true }
);

const OffPlan =
  mongoose.models.OffPlans || mongoose.model("OffPlans", offPlanSchema);
export default OffPlan;
