import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';


const page: React.FC = async () => {
  const session = await getServerSession(authOptions)
  if(session?.user) {
      return <div> ADMIN PAGE - welcome back {session?.user.username || session.user.name} </div>;
  }
  return <div> Please Login</div>;
}

export default page;