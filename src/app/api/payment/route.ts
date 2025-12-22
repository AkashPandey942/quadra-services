import Razorpay from "razorpay";

export async function POST() {
  const key_id = process.env.RAZORPAY_KEY;
  const key_secret = process.env.RAZORPAY_SECRET;

  if (!key_id || !key_secret) {
    return Response.json({ error: "Razorpay keys not configured" }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id,
    key_secret,
  });

  try {
    const order = await razorpay.orders.create({
      amount: 500000,
      currency: "INR",
    });
    return Response.json(order);
  } catch (error) {
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
