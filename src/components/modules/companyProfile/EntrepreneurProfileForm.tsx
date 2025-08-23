/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import GradientTitle from '@/components/ui/gradientTitle';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { useCreateEntrepreneurProfileMutation } from '@/redux/features/entrepreneur-profile/entrepreneurProfile.api';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router';

// ----------------- Zod Schema -----------------
const formSchema = z.object({
  founders: z.object({
    names: z.array(z.object({ value: z.string().min(2, 'Name must be at least 2 characters') })),
    technicalFounder: z.string().min(2, 'Required'),
    coFounders: z.boolean(),
    coFounderNames: z
      .array(z.object({ value: z.string().min(2, 'Name must be at least 2 characters') }))
      .optional(),
  }),
  company: z.object({
    name: z.string().min(2),
    shortDescription: z.string().min(5),
    linkedIn: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),
    product: z.string().min(2),
    location: z.string().min(2),
  }),
  stage: z.enum(['idea', 'prototype', 'launched', 'scaling']),
  industry: z.string().min(2),
  funding: z.object({
    amountSeeking: z.number().nonnegative(),
    currency: z.string().min(1),
    equityOffered: z.number().min(0).max(100),
  }),
  traction: z
    .object({
      usersCount: z.number(),
      revenue: z.number(),
      growthRate: z.string(),
    })
    .optional(),
});

type EntrepreneurFormValues = z.infer<typeof formSchema>;

// ----------------- Component -----------------
export default function EntrepreneurProfileForm() {
  const { data } = useUserInfoQuery(undefined);
  const [createEntrepreneurProfile] = useCreateEntrepreneurProfileMutation();
  const userId = data?.data?._id;
  const navigate = useNavigate();

  const form = useForm<EntrepreneurFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      founders: {
        names: [{ value: '' }],
        technicalFounder: '',
        coFounders: false,
        coFounderNames: [{ value: '' }],
      },
      company: {
        name: '',
        shortDescription: '',
        product: '',
        location: '',
        linkedIn: '',
        twitter: '',
        website: '',
      },
      stage: 'idea',
      industry: '',
      funding: {
        amountSeeking: 0,
        currency: 'USD',
        equityOffered: 0,
      },
      traction: {
        usersCount: 0,
        revenue: 0,
        growthRate: '',
      },
    },
  });

  // ----------------- Field Arrays -----------------
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'founders.names',
  });

  const {
    fields: coFounderFields,
    append: appendCoFounder,
    remove: removeCoFounder,
  } = useFieldArray({
    control: form.control,
    name: 'founders.coFounderNames',
  });

  const onSubmit = async (values: EntrepreneurFormValues) => {
    const payload = {
      userId,
      founders: {
        names: values.founders.names.map((f) => f.value),
        technicalFounder: values.founders.technicalFounder,
        coFounders: values.founders.coFounders,
        coFounderNames: values.founders.coFounders
          ? values.founders.coFounderNames?.map((f) => f.value) || []
          : [],
      },
      company: {
        name: values.company.name,
        shortDescription: values.company.shortDescription,
        linkedIn: values.company.linkedIn || '',
        twitter: values.company.twitter || '',
        website: values.company.website || '',
        product: values.company.product,
        location: values.company.location,
      },
      stage: values.stage,
      industry: values.industry,
      funding: {
        amountSeeking: values.funding.amountSeeking,
        currency: values.funding.currency,
        equityOffered: values.funding.equityOffered,
      },
      traction: values.traction
        ? {
            usersCount: values.traction.usersCount,
            revenue: values.traction.revenue,
            growthRate: values.traction.growthRate,
          }
        : undefined,
    };

    const toastId = toast.loading('Profile creating...');
    try {
      const res = await createEntrepreneurProfile(payload).unwrap();
      toast.success(res.message || 'Profile created.', { id: toastId });
      navigate('/');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Profile creation failed', { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8">
        <Card className="p-6 shadow-lg">
          <CardHeader>
            <GradientTitle
              title="Entrepreneur Profile"
              description="Fill out the details of founders, company, funding, and traction."
            />
          </CardHeader>

          <CardContent className="space-y-8">
            {/* ---------------- Founders ---------------- */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Founders</h3>

              {/* Founder Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`founders.names.${index}.value` as const}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder={`Founder ${index + 1} Name`} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => append({ value: '' })}>
                  <Plus className="h-4 w-4" /> Add Founder
                </Button>
              </div>

              {/* Technical Founder */}
              <FormField
                control={form.control}
                name="founders.technicalFounder"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Technical Founder</FormLabel>
                    <FormControl>
                      <Input placeholder="Technical Founder Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Co-Founders Checkbox */}
              <FormField
                control={form.control}
                name="founders.coFounders"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 mt-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel>Has Co-Founders?</FormLabel>
                  </FormItem>
                )}
              />

              {/* Co-Founder Names */}
              {form.watch('founders.coFounders') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {coFounderFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`founders.coFounderNames.${index}.value` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder={`Co-Founder ${index + 1}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeCoFounder(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => appendCoFounder({ value: '' })}
                  >
                    <Plus className="h-4 w-4" /> Add Co-Founder
                  </Button>
                </div>
              )}
            </section>

            {/* ---------------- Company Info ---------------- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'name',
                'shortDescription',
                'product',
                'location',
                'linkedIn',
                'twitter',
                'website',
              ].map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`company.${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </section>

            {/* ---------------- Stage & Industry ---------------- */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="launched">Launched</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Industry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* ---------------- Funding ---------------- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['amountSeeking', 'currency', 'equityOffered'].map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`funding.${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          type={key !== 'currency' ? 'number' : 'text'}
                          placeholder={key === 'currency' ? 'USD' : '0'}
                          {...field}
                          onChange={(e) =>
                            key !== 'currency'
                              ? field.onChange(Number(e.target.value))
                              : field.onChange(e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </section>

            {/* ---------------- Traction ---------------- */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['usersCount', 'revenue', 'growthRate'].map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`traction.${key}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                      <FormControl>
                        <Input
                          type={key !== 'growthRate' ? 'number' : 'text'}
                          placeholder={key !== 'growthRate' ? '0' : 'e.g. 20% MoM'}
                          {...field}
                          onChange={(e) =>
                            key !== 'growthRate'
                              ? field.onChange(Number(e.target.value))
                              : field.onChange(e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </section>

            <div className="flex justify-between mt-6">
              <Button type="submit">Submit</Button>
              <Link to="/">
                <Button type="button" variant="secondary">
                  Skip
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
