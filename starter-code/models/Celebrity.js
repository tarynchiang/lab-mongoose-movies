const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const celebritySchema = new Schema({
  name:String,
  occupation:String,
  catchPhrase:String,
  image: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const celebrityModel = mongoose.model("Celebrity", celebritySchema);

module.exports = celebrityModel;