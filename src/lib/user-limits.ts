import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { db } from "./db";
import { MAX_FREE_MESSAGES } from "@/constants/messages";


export const incrementCreditsAvaliable = async () => {

  const session = await getServerSession(authOptions);

  if(!session?.user) {
    throw new Error('Unauthorized')
  }

  const userCredits = await db.userInviteLimit.findUnique({
    where: { userId: session.user.id },
  });

  if(userCredits) {
    await db.userInviteLimit.update({
      where: { userId: session.user.id },
      data: { count: userCredits.count + 1 },
    });
  } else {
    await db.userInviteLimit.create({
      data: { userId: session.user.id, count: 1 },
    });
  }
}

export const decreaseCreditsAvaliable = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const userCredits = await db.userInviteLimit.findUnique({
    where: { userId: session.user.id },
  });

  if (userCredits) {
    await db.userInviteLimit.update({
      where: { userId: session.user.id },
      data: { count: userCredits.count > 0 ? userCredits.count - 1 : 0 },
    });
  } else {
    await db.userInviteLimit.create({
      data: { userId: session.user.id, count: 1 },
    });
  }
};

export const hasAvailableCredits = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  
  
  const userCredits = await db.userInviteLimit.findUnique({
    where: { userId: session.user.id },
  });
  
  
  if(!userCredits || userCredits.count < MAX_FREE_MESSAGES) {
    return true
  } else {
    return false
  }
  
}
export const getAvailableCredits = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return 0
  }


  const  messagesLimit = await db.userInviteLimit.findUnique({
    where: { userId: session.user.id }
  })


  if(!messagesLimit) {
    return 0
  }

  return messagesLimit.count

}