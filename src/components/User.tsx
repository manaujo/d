"use client"

import { useSession } from 'next-auth/react';
import React from 'react';

// import { Container } from './styles';

const User: React.FC = () => {
  const { data: session } = useSession()
  return <pre>{JSON.stringify(session)}</pre>;
}

export default User;