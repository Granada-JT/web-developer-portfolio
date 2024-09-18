const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name is required."],
  },
  emailAddress: {
    type: String,
    required: [true, "Email address is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required."],
  },
  message: {
    type: String,
    required: [true, "Message is required."],
  },
  sentOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Visitor", visitorSchema);
