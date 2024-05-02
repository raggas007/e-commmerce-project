import express from "express";
import { isBuyer } from "../middleware/authentication.middleware.js";
import { generateRandomString } from "../utils/generate.random.string.js";
import axios from "axios";
import Order from "../order/order.model.js";

const router = express.Router();

//initiate payment
router.post("/payment/khalti/start", isBuyer, async (req, res) => {
  const { amount, productList } = req.body;
  const purchaseOrderId = generateRandomString();
  try {
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: "http://localhost:5173/payment/khalti/success/",
        website_url: "http://localhost:5173/",
        amount: Number(amount) * 100,
        purchase_order_id: purchaseOrderId,
        purchase_order_name: `item-${purchaseOrderId}`,
      },
      {
        headers: {
          Authorization: "key 0158a3a639a646f6bb15bb840a30c1c9",
          ContentType: "application/json",
        },
      }
    );

    await Order.create({
      buyerId: req.loggedInUserId,
      totalAmount: amount,
      paymentStatus: "Initiated",
      pidx: khaltiResponse?.data?.pidx,
    });

    console.log(khaltiResponse);
    return res.status(200).send({
      message: "payment success",
      khaltiPaymentDetails: khaltiResponse?.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Payment initialization failed" });
  }
});

export default router;
