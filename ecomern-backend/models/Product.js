const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "can't be blank"]
  },
  description: {
    type: String,
    required: [true, "can't be blank"]
  },
  discountPrice: { type: Number},
  brand: { type: String},
creator:{type:String},
  price: {
    type: String,
    required: [true, "can't be blank"]
  },
  discountPercentage: { type: Number, min:[1, 'wrong min discount'], max:[99, 'wrong max discount']},
  location:{type:String},
  numberItems:{type:Number},
  age:{type:Number},
  infoAdd:{type:String},
  specifications:{type:String},
  category: {
    type: String,
    required: [true, "can't be blank"]
  },
  rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
stock: { type: Number, min:[0, 'wrong min stock'], default:0},
  pictures: {
    type: Array,
    required: true
  }
}, {minimize: false});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
