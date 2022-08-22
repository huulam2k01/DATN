var mongoose = require("mongoose");

var DistrictSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    typename: {
      type: String,
      required: true,
    },
    parent_code: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    path_with_type: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

var District = mongoose.model("District", DistrictSchema, "Dictrict");
module.exports = District;
