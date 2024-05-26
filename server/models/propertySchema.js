// Property.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema({
  place: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  area: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  hospitalsNearby: {
    type: String
  },
  collegesNearby: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
