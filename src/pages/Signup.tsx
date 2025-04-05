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
import { SignupFormValues, signupSchema } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await signup(values.email, values.name, values.password);
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
        <h1 className='text-2xl font-bold text-gray-900'>Create an account</h1>
        <p className='text-gray-500 mt-2'>Sign up to get started</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormMessage name='name' />
              </FormItem>
            )}
          />

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
                <FormMessage name='password' className='text-xs' />
                <ul className='text-xs text-muted-foreground space-y-1 mt-2'>
                  <li
                    className={`flex items-center gap-1 ${
                      field.value.length >= 8 ? 'text-green-500' : ''
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        field.value.length >= 8
                          ? 'bg-green-500'
                          : 'bg-muted-foreground'
                      }`}
                    ></div>
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[a-zA-Z]/.test(field.value) ? 'text-green-500' : ''
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        /[a-zA-Z]/.test(field.value)
                          ? 'bg-green-500'
                          : 'bg-muted-foreground'
                      }`}
                    ></div>
                    At least 1 letter
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[0-9]/.test(field.value) ? 'text-green-500' : ''
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        /[0-9]/.test(field.value)
                          ? 'bg-green-500'
                          : 'bg-muted-foreground'
                      }`}
                    ></div>
                    At least 1 number
                  </li>
                  <li
                    className={`flex items-center gap-1 ${
                      /[^a-zA-Z0-9]/.test(field.value) ? 'text-green-500' : ''
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        /[^a-zA-Z0-9]/.test(field.value)
                          ? 'bg-green-500'
                          : 'bg-muted-foreground'
                      }`}
                    ></div>
                    At least 1 special character
                  </li>
                </ul>
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full py-6' disabled={isSubmitting}>
            {isSubmitting ? (
              <span className='flex items-center justify-center'>
                <span className='animate-spin h-4 w-4 mr-2 border-2 border-b-transparent rounded-full'></span>
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </Button>

          <div className='text-center mt-6'>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <Link to='/login' className='text-primary hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Signup;
