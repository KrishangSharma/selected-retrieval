const mongoose = require("mongoose");

// Define the schema
const testSchema = new mongoose.Schema({
  field1: {
    type: String,
    required: true,
  },
  field2: [
    {
      name: {
        type: String,
        required: true,
      },
      array: [
        {
          subField1: {
            type: Number,
            required: true,
          },
          subField2: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

// Create the model
const Test = mongoose.model("Test", testSchema);

module.exports = Test;
