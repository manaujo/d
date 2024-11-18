import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";


const DAY_IN_MS = 84_400_000

export const checkSubscription = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user


  if (!user) {
    return false;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: { userId: user.id },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false
  }

  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()


  return !!isValid;
}