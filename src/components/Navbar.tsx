

import Link from 'next/link';
import {  Button, buttonVariants } from './ui/button';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <img className="w-44" src="/logo.png" />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/sign-in">
            <Button variant={'secondary'}>Entrar</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
