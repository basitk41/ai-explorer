import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { LoginFormValues, loginSchema } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        navigate('/app');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Welcome back</h1>
        <p className='text-gray-500 mt-2'>Sign in to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='your@email.com' {...field} />
                </FormControl>
                <FormMessage name='email' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='••••••••' {...field} />
                </FormControl>
                <FormMessage name='password' />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full py-6' disabled={isSubmitting}>
            {isSubmitting ? (
              <span className='flex items-center justify-center'>
                <span className='animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full'></span>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </Button>

          <div className='text-center mt-6'>
            <p className='text-sm text-gray-500'>
              Don't have an account?{' '}
              <Link to='/signup' className='text-primary hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;
