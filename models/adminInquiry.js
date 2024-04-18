const { Schema, default: mongoose } = require("mongoose");

const adminInquirySchema = new Schema({
    name: String,
    email: String,
    mobile: String
}, { timestamps: true });

const AdminInquiry = mongoose.models.adminInquiry || mongoose.model('adminInquiry', adminInquirySchema);

export default AdminInquiry;
