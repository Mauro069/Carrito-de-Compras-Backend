const Cart = require("../model/Cart");

const putProduct = async (req, res) => {
  const { productId } = req.params;
  const { query } = req.query;
  const body = req.body;

  /* Buscamos el producto en el carrito */
  const productBuscado = await Cart.findById(productId);

  /* Si no hay query 'add' o 'del' */
  if (!query) {
    res.status(404).json({ mensaje: "Debes enviar una query" });

    /* Si esta el producto en el carrito y quiero agregar */
  } else if (productBuscado && query === "add") {
    body.amount = body.amount + 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) => {
      res.json({
        mensaje: `El producto: ${product.name} fue actualizado`,
        product,
      });
    });

    /* Si esta el producto en el carrito y quiero sacar */
  } else if (productBuscado && query === "del") {
    body.amount = body.amount - 1;

    await Cart.findByIdAndUpdate(productId, body, {
      new: true,
    }).then((product) =>
      res.json({
        mensaje: `El producto: ${product.name} fue actualizado`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "Ocurrio un error" });
  }
};

module.exports = putProduct;
