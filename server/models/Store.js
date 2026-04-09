import { Schema, model } from "mongoose";
const RatingSchema = new Schema(
  {
    user: { type: String },
    rating: { type: Number },
  },
  { _id: false },
);

const StoreSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  rating: { type: Number, default: 0 },
  ratings: { type: [RatingSchema], default: [] },
});

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
