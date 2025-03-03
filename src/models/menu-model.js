import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  menuType: {
    type: String,
    required: true,
    enum: ["Samosa", "Chai"],
  },
});

export const MenuModel = mongoose.models.Menu ?? mongoose.model("Menu", menuSchema);
