import User from "../models/User.js";



// Update User CartData: /api/cart/update
// export const updateCart = async (req, res) => {
//     try {
//         const { cartItems } = req.body;
//         const userId = req.user.id;
//         await User.findByIdAndUpdate(userId, {cartItems});
//         res.json({ success: true, message: "Cart Updated"});
        
//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message});
//     }
    
// };


export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const cartArray = Object.entries(cartItems).map(([productId, quantity]) => ({
      productId,
      quantity
    }));

    await User.findByIdAndUpdate(req.user.id, { cart: cartArray });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



