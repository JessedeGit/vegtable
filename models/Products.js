const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  unit1: { type: String },
  price: Number,
  unit2: { type: String },
  remark: { type: String },
  
}, { timestamps: true });

 const Products = mongoose.model('Products', productSchema);
 const ProductsOld = mongoose.model('ProductsOld', productSchema);

module.exports = {Products:Products, ProductsOld:ProductsOld};