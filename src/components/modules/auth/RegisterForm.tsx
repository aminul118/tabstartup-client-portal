/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import loginImage from './../../../assets/images/invest.jpg';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Password from '@/components/ui/password';
import { toast } from 'sonner';
import { useRegisterMutation } from '@/redux/features/auth/auth.api';
import type { IResponse } from '@/types';
import { Link, useNavigate } from 'react-router';
import Logo from '@/components/layouts/Logo';

// ✅ Zod schema for validation including confirm password
const formSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, { message: 'Phone number is too short' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
    role: z.enum(['investor', 'entrepreneur', 'mentor'], { message: 'Role is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // errors will appear under confirmPassword field
  });

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  isDeleted: boolean;
  isActive: string;
  isVerified: boolean;
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface Auth {
  provider: string;
  providerId: string;
}

const RegisterForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const [register] = useRegisterMutation(undefined);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'investor',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      password: values.password,
    };
    const toastId = toast.loading('Register processing');
    try {
      const res: IResponse<IUser> = await register(payload).unwrap();
      toast.success(res.message || `${values.role} created successfully`, { id: toastId });
      navigate('/verify', {
        state: {
          email: values.email,
          emailSent: true,
        },
        replace: true,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to Register', { id: toastId });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6 ', className)} {...props} data-aos="fade-right">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Left side image */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          {/* Right side form */}
          <div className="p-8">
            <div className="flex flex-col items-center text-center">
              <Logo />
              <p className="text-muted-foreground text-balance">Register to Tab Startup portal</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-12">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="1234567890" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-6"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="investor" />
                            </FormControl>
                            <FormLabel className="font-normal">Investor</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="entrepreneur" />
                            </FormControl>
                            <FormLabel className="font-normal">Entrepreneur</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="mentor" />
                            </FormControl>
                            <FormLabel className="font-normal">Mentor</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm mt-4">
              You already have an account?
              <Link to="/login">
                <Button variant="link">Sign in</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
