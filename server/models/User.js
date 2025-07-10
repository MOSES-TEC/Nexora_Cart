import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1
          }
        }
      ]
}, {minimize: false});


const User = mongoose.models.user || mongoose.model('user', userSchema);


export default User;

