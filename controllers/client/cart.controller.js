const Cart = require("../../models/cart.model");

// [POST]/cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const exitsProductInCart = cart.products.find(item => item.product_id == productId);

    if(exitsProductInCart){
        const quantityNew = quantity + exitsProductInCart.quantity;
        
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": quantityNew
            }
        });
    }else{
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };

        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {products: objectCart}
        });
    }
    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng!");

    res.redirect("back");
}

// [GET] /cart
module.exports.index = (req, res) => {
    res.send("ok");
}