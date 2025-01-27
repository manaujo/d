import { getServerSession } from "next-auth";
import { InputType, ReturnType } from "./types";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { absoluteUrl } from "@/lib/utils";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";



const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);

  if (!session) return { error: "Unauthorized" };

  const settingsUrl = absoluteUrl(`/organization/${session.user.id}`);

  let url = "";

  try {
    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: session.user.email || undefined,
        line_items: [
          {
            price_data: {
              currency: "BRL",
              product_data: {
                name: "TextMessages",
                description: "Mensagens ilimitadas para suas interações",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: session.user.id,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: "Alguma coisa deu errado!",
    };
  }

  revalidatePath(`/organization/${session.user.id}`);

  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler );