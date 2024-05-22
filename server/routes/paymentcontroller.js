import Router from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const PaymentRouter = Router();

PaymentRouter.post('/orders',async(req,res)=>{
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        if(!req.body){
            console.log("body error ")
            return res.status(400).send("Bad request");
        }
        const options = req.body;
        const order  = await instance.orders.create(options);

        if(!order){
            console.log("error ")
            return res.status(400).send("Bad request");
        }
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

PaymentRouter.post("/verify", async (req, res) => {

    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    // order_id + " | " + razorpay_payment_id

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest!== razorpay_signature) {
        return res.status(400).json({msg: " Transaction is not legit!"});
    }

    res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
})


export default PaymentRouter;