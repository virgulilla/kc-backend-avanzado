import mongoose, { Schema } from 'mongoose'

const productSchema =  new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }
  }, {
    collection: 'products' // para forzar el nombre de la coleccion
  })
  
  productSchema.index({ tags: 1 })
  productSchema.index({ price: 1 })
  productSchema.index({ name: 1 })
  
export const Product = mongoose.model('Product', productSchema)