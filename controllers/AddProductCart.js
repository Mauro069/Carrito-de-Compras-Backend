const Cart = require("../model/Cart");
const Product = require("../model/Product");

const addProductCart = async (req, res) => {
  const { name, img, price } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Product.findOne({ name });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = name !== "" && img !== "" && price !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ name });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ name, img, price, amount: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, name, img, price },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};

module.exports = addProductCart;
