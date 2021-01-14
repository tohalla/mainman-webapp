import { loadStripe } from "@stripe/stripe-js";

export default loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY ?? "");
