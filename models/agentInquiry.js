const { Schema, default: mongoose } = require("mongoose");

const agentInquirySchema = new Schema({
    agent: String,
    name: String,
    email: String,
    mobile: String
}, { timestamps: true });

const AgentInquiry = mongoose.models.agentInquiry || mongoose.model('agentInquiry', agentInquirySchema);

export default AgentInquiry;