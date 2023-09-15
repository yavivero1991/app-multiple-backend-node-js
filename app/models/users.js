const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const mongoseDelete = require("mongoose-delete");

const UserScheme = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    role: {type: ["user", "admin"], default: "user", },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
UserScheme.index({ email: 1 });
UserScheme.plugin(mongoosePaginate);
UserScheme.plugin(mongoosePaginateAggregate);
UserScheme.plugin(mongoseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model("users", UserScheme);
