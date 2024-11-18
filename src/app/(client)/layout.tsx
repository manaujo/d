import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ReactNode } from "react";


interface ProviderProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ProviderProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in')
  }
    
    
  return <div>{children}</div>;
};

export default ClientLayout;
