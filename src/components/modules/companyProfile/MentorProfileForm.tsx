import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Link, useNavigate } from 'react-router';
import { Plus, Trash } from 'lucide-react';
import GradientTitle from '@/components/ui/gradientTitle';
import { useCreateMentorProfileMutation } from '@/redux/features/mentor-profile/mentorProfile.api';
import { toast } from 'sonner';

const mentorSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  profilePicture: z.string().optional(),
  location: z.string().optional(),

  socialLinks: z.object({
    linkedIn: z.string().optional(),
    website: z.string().optional(),
    twitter: z.string().optional(),
  }),

  organization: z.string().optional(),
  industryExpertise: z.array(z.string()).min(1),
  yearsOfExperience: z.string().min(0).optional(),

  education: z.array(
    z.object({
      degree: z.string().min(2),
      institution: z.string().min(2),
      year: z.string().optional(),
    }),
  ),

  areasOfExpertise: z.array(z.string()).min(1),
  preferredStartupStages: z.array(z.string()).optional(),
  availabilityPerMonthHours: z.string().optional(),

  bio: z.string().optional(),
  motivation: z.string().optional(),
  compensationType: z.enum(['free', 'equity', 'paid']).optional(),
  preferredRegions: z.array(z.string()).optional(),
});

type MentorFormValues = z.infer<typeof mentorSchema>;

export default function MentorProfileForm() {
  const [createMentorProfile] = useCreateMentorProfileMutation();
  const navigate = useNavigate();
  const form = useForm<MentorFormValues>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      education: [{ degree: '', institution: '' }],
      industryExpertise: [],
      areasOfExpertise: [],
      preferredStartupStages: [],
      preferredRegions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const onSubmit = async (values: MentorFormValues) => {
    console.log('Mentor Profile Submitted:', values);
    const toastId = toast.loading('Creating Mentor Profile...');
    try {
      const res = await createMentorProfile(values).unwrap();
      if (res.message) {
        toast.success(res.message, { id: toastId });
      }
      toast.success('Mentor Profile Created Successfully!', { id: toastId });
      form.reset();
      navigate('/my-company-profile');
    } catch {
      toast.error('Failed to create Mentor Profile', { id: toastId });
    }
  };

  return (
    <section className="flex justify-center py-10">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
        <CardHeader>
          <GradientTitle title="Mentor Profile" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Social Links */}
                <FormField
                  control={form.control}
                  name="socialLinks.linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="LinkedIn URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="Twitter URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialLinks.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value)}
                          placeholder="Website URL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization & Experience */}
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input placeholder="Organization / Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Industry & Expertise */}
                <FormField
                  control={form.control}
                  name="industryExpertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry Expertise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Fintech, AI"
                          value={(field.value ?? []).join(', ')}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(',').map((v) => v.trim()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="areasOfExpertise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Areas of Expertise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Web Development"
                          value={(field.value ?? []).join(', ')}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(',').map((v) => v.trim()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Startup Stages */}
                <FormField
                  control={form.control}
                  name="preferredStartupStages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Startup Stages</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Seed, Series A"
                          value={(field.value ?? []).join(', ')}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(',').map((v) => v.trim()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Compensation */}
                <FormField
                  control={form.control}
                  name="compensationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compensation Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="equity">Equity</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Regions */}
                <FormField
                  control={form.control}
                  name="preferredRegions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Regions</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Europe, Asia"
                          value={(field.value ?? []).join(', ')}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(',').map((v) => v.trim()))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Education */}
              <FormLabel>Education</FormLabel>
              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Degree" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.institution` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Institution" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`education.${index}.year` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="Year" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center gap-2">
                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                      <Trash />
                    </Button>
                    <Button type="button" onClick={() => append({ degree: '', institution: '' })}>
                      <Plus />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Availability */}
              <FormField
                control={form.control}
                name="availabilityPerMonthHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability (Hours per Month)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="e.g., 20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio & Motivation */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Write a short bio..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivation</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Why you want to mentor..." />
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
    </section>
  );
}
