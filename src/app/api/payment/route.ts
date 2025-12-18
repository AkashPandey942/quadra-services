import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST() {
  const order = await razorpay.orders.create({
    amount: 500000,
    currency: "INR",
  });
  return Response.json(order);
}
