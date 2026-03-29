const mongoose = require("mongoose");
const AccountDeactivate = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    empid: { type: String, required: true },
    Reason: { type: String, },
    Submittedon:{type:Date,default:Date.now()},

    IssueType:{type: String, required: true}

},)
const ModelReasonDeactivate = mongoose.model("DeactivateAccountIssues", AccountDeactivate);
module.exports = {ModelReasonDeactivate};
