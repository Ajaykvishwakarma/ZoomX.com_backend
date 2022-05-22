const { Router } = require("express")
const { auth } = require('../middlewares/auth');

const router = Router()

const Cart = require('../models/cart.model');


router.post('/cart', auth,async (req, res) => {
    try{
        const cart = await Cart.create(req.body)
        return res.status(200).send(cart)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/cart/:id', auth, async(req, res) => {
    try{
        const cart = await Cart.findById(req.params.id).lean().exec()
        return res.status(200).send(cart)

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})

router.get("/carts", auth, async (req, res) => {
  
    try{
        const cart = await Cart.find().lean().exec();

        return res.status(200).send({cart});
    } catch (error){
        return res.status(500).send({message :error.message})
    }
});

router.delete("/cart/:id",auth, async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(cart);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

module.exports = router;