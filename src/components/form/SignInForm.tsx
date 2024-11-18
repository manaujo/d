'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const FormSchema = z.object({
  email: z.string().min(1, "Campo Obrigatório!").email("Email Invalido!"),
  password: z
    .string()
    .min(1, "Campo Obrigatório!")
    .min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

const SignInForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! something wrong.",
        variant: 'destructive'
      })
    } else {
      router.refresh();
      router.push('/admin')
    }
  }; 

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-[300px]'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@exemplo.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='*********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Entrar
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow bg-stone-400'>

      </div>
      <GoogleSignInButton>Entrar com Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Se não possui uma conta&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Registre-se
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
