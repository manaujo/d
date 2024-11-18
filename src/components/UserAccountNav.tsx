"use client";
import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';


const UserAccountNav: React.FC = () => {
  return (
    <Button onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/sign-in`
    })} variant={"destructive"}>
      Sair
    </Button>
  );
}

export default UserAccountNav;