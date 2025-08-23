/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import loginImage from './../../../assets/images/invest.jpg';
import { Link, useLocation, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Password from '@/components/ui/password';
import Logo from '@/components/layouts/Logo';
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const [login] = useLoginMutation(undefined);
  const location = useLocation();
  const from = location.state?.from || '/';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading('User login processing..');
    try {
      const res = await login(values).unwrap();
      toast.success(res.message || 'Login Successfully', { id: toastId });

      const profile = res?.data?.user?.investor_profile || res?.data?.user?.entrepreneur_profile;

      if (!profile) {
        navigate('/company-profile', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      if (error?.data?.message === "Error: User isn't verified") {
        navigate('/verify', { state: values.email });
      }
      toast.error(error?.data?.message || 'Something Went Wrong', { id: toastId });
    }
  };

  return (
    <div
      className={cn('flex justify-center items-center', className)}
      {...props}
      data-aos="fade-left"
    >
      <Card className="overflow-hidden w-full max-w-5xl p-0">
        <CardContent className="grid md:grid-cols-2 p-0">
          {/* Form Section */}
          <div className="p-6 md:p-12 flex flex-col justify-center gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="text-center ">
                  <Logo />
                  <p className="text-muted-foreground">Login to your Tab Startup portal</p>
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Password type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>

              <div className="text-center text-sm mt-4">
                Don't have an account?
                <Link to="/register">
                  <Button variant="link">Sign up</Button>
                </Link>
              </div>
            </Form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block relative w-full h-full">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
