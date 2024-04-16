const { Schema, default: mongoose } = require("mongoose");

const leadsSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    leadFor: { type: String, required: true }
}, { timestamps: true });

const Leads = mongoose.models.Leads || mongoose.model("Leads", leadsSchema);

export default Leads;