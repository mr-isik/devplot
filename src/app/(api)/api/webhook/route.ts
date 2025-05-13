import { createSubscription } from "@/actions/subscriptions/actions";
import { Paddle, Environment, EventName } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

const paddle = new Paddle(process.env.PADDLE_TOKEN!, {
  environment: Environment.sandbox,
});

export const POST = async (req: Request) => {
  const signature = (req.headers.get("paddle-signature") as string) || "";
  // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
  // If express returned a JSON, remove any other middleware that might have processed raw request to object
  const rawRequestBody = (await req.text()) || "";
  // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
  const secretKey = process.env.WEBHOOK_SECRET_KEY || "";

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );
      /* database operations */
      switch (eventData.eventType) {
        case EventName.CustomerCreated:
          console.log(`Customer ${eventData.data.email} was created`);
          break;
        case EventName.SubscriptionActivated:
          console.log(
            `Subscription ${eventData.data.customerId} was activated`
          );
          break;
        case EventName.SubscriptionCanceled:
          console.log(`Subscription ${eventData.data.customerId} was canceled`);
          break;
        case EventName.TransactionPaid:
          /* Create subscription for this customer */
          const { error } = await createSubscription(
            /* @ts-ignore */
            eventData.data.customData?.userId!,
            eventData.data.customerId!,
            /* @ts-ignore */
            eventData.data.customData?.planId!
          );

          if (error) {
            console.error("Subscription creation error:", error);
          }
          break;
        default:
          console.log(eventData.eventType);
      }
    } else {
      console.log("Signature missing in header");
    }
  } catch (e) {
    // Handle signature mismatch or other runtime errors
    console.log(e);
  }
  // Return a response to acknowledge
  return NextResponse.json({
    ok: true,
  });
};
