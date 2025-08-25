/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GradientTitle from '@/components/ui/gradientTitle';
import { toast } from 'sonner';
import { useCreateInvestorProfileMutation } from '@/redux/features/investor-profile/investorProfile.api';
import { Link, useNavigate } from 'react-router';

const formSchema = z.object({
  investmentExperience: z.string().min(5, { message: 'Experience is required.' }),
  linkedIn: z.string().url({ message: 'Enter a valid LinkedIn URL.' }),
  twitter: z.string().min(3, { message: 'Enter your Twitter handle.' }),
  portfolioSize: z.coerce.number().min(0, { message: 'Portfolio size must be positive.' }),
  investmentStage: z.string().min(1, { message: 'Investment stage is required.' }),
  industryFocus: z.array(z.string()).min(1, { message: 'Select at least one industry.' }),
});

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Real Estate',
  'Energy',
  'Consumer Goods',
  'Entertainment',
  'Transportation',
  'Agriculture',
];

const InvestorProfileForm = () => {
  const [createInvestorProfile] = useCreateInvestorProfileMutation();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentExperience: '',
      linkedIn: '',
      twitter: '',
      portfolioSize: 0,
      investmentStage: '',
      industryFocus: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading('Submitting investment profile...');

    try {
      const res = await createInvestorProfile(values).unwrap();
      console.log('Profile created:', res);
      toast.success('Profile created successfully!', { id: toastId });
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error(error);

      toast.error(error?.data?.message || 'Something went wrong', { id: toastId });
    }
  };

  return (
    <Card className=" max-w-3xl mx-auto mt-12">
      <CardHeader>
        <GradientTitle title=" Complete Your Investment Profile" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="investmentExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your experience..."
                      className="min-h-64"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://linkedin.com/in/..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="@twitterhandle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Size</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value as number}
                      placeholder="2500000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investmentStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Stage</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Seed, Series A..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ShadCN Checkbox Group for Multi-Select Industry */}
            <Controller
              name="industryFocus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Focus</FormLabel>
                  <FormControl>
                    <div className="grid lg:grid-cols-4 space-y-2">
                      {industries.map((industry) => (
                        <label key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(industry)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, industry]);
                              } else {
                                field.onChange(field.value.filter((v: string) => v !== industry));
                              }
                            }}
                          />
                          <span>{industry}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="submit">Submit</Button>
              <Link to="/">
                <Button variant="secondary" type="button">
                  Skip
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InvestorProfileForm;
