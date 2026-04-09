import { Schema, model } from "mongoose";

const RatingSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { _id: false },
);
const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 60,
    },
    address: {
      type: String,
      maxlength: 400,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: [RatingSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const Store = model("Store", StoreSchema);
export function countDocuments() {
  return Store.countDocuments();
}

export function insertMany(docs) {
  return Store.insertMany(docs);
}

export function find(...args) {
  return Store.find(...args);
}

export function findById(id) {
  return Store.findById(id);
}

export default Store;
