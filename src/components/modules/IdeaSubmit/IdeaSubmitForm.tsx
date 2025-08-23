/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GradientTitle from '@/components/ui/gradientTitle';
import { companyProfileZodSchema } from '../IdeaSubmit/companyProfileZodSchema';

const IdeaSubmitForm = () => {
  const form = useForm({
    resolver: zodResolver(companyProfileZodSchema),
    defaultValues: {
      founders: { names: '', technicalFounder: '', coFounders: false, coFounderNames: [] },
      company: {
        name: '',
        shortDescription: '',
        website: '',
        product: '',
        location: '',
        locationReason: '',
      },
      progress: {
        status: '',
        timeSpent: '',
        techStack: '',
        productDemo: '',
        selling: false,
        revenue: false,
      },
      ideas: {
        whyThisIdea: '',
        competitors: '',
        moneyMaking: '',
        category: '',
      },
      equity: {
        legalEntity: false,
        investment: false,
        fundraising: false,
        country: '',
      },
      curious: {
        discovery: '',
        priorPrograms: '',
      },
      userId: '',
    },
  });

  const onSubmit = (values: z.infer<typeof companyProfileZodSchema>) => {
    console.log(values);
  };

  // Helper for Yes/No radio buttons (boolean)
  const renderBooleanRadio = (field: any, label: string) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroup
          value={field.value ? 'yes' : 'no'}
          onValueChange={(val: string) => field.onChange(val === 'yes')}
          className="flex space-x-4"
        >
          <FormItem>
            <FormLabel>Yes</FormLabel>
            <RadioGroupItem value="yes" />
          </FormItem>
          <FormItem>
            <FormLabel>No</FormLabel>
            <RadioGroupItem value="no" />
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );

  return (
    <Card className="max-w-3xl mx-auto mt-12">
      <CardHeader>
        <GradientTitle title="Complete Your Entrepreneur Profile" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            {/* Founders */}
            <h2 className="text-xl font-bold">Founders</h2>
            <FormField
              control={form.control}
              name="founders.names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Founders' names</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Founder names" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="founders.technicalFounder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Who writes code, or does other technical work on your product?
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Technical founder" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="founders.coFounders"
              render={({ field }) => renderBooleanRadio(field, 'Do you have any co-founder?')}
            />
            {form.watch('founders.coFounders') && (
              <FormField
                control={form.control}
                name={`founders.coFounderNames` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Co-Founder Names (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            (e.target as HTMLInputElement).value
                              .split(',')
                              .map((v) => v.trim())
                              .filter(Boolean),
                          )
                        }
                        placeholder="Co-founder names"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Company */}
            <h2 className="text-xl font-bold">Company</h2>
            {(
              [
                'name',
                'shortDescription',
                'website',
                'product',
                'location',
                'locationReason',
              ] as const
            ).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={`company.${name}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        {
                          name: 'Company Name',
                          shortDescription:
                            'Describe what your company does in 50 characters or less',
                          website: 'Company URL, if any',
                          product: 'What is your company going to make?',
                          location: 'Where do you live now, and where would the company be based?',
                          locationReason: 'Explain your decision regarding location',
                        }[name]
                      }
                    </FormLabel>
                    <FormControl>
                      {name === 'shortDescription' || name === 'locationReason' ? (
                        <Textarea {...field} />
                      ) : (
                        <Input {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Progress */}
            <h2 className="text-xl font-bold">Progress</h2>
            {(['status', 'timeSpent', 'techStack', 'productDemo'] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={`progress.${name}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        {
                          status: 'How far along are you?',
                          timeSpent: 'How long have each of you been working? How much full-time?',
                          techStack: 'What tech stack are you using/planning?',
                          productDemo: 'Provide a link to demo video or pitchdeck',
                        }[name]
                      }
                    </FormLabel>
                    <FormControl>
                      {name === 'productDemo' ? <Input {...field} /> : <Input {...field} />}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="progress.selling"
              render={({ field }) =>
                renderBooleanRadio(field, 'Are you currently selling your product?')
              }
            />
            <FormField
              control={form.control}
              name="progress.revenue"
              render={({ field }) => renderBooleanRadio(field, 'Do you have revenue?')}
            />

            {/* Ideas */}
            <h2 className="text-xl font-bold">Ideas</h2>
            {(['whyThisIdea', 'competitors', 'moneyMaking', 'category'] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={`ideas.${name}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        {
                          whyThisIdea: 'Why did you pick this idea? Do you have domain expertise?',
                          competitors:
                            "Who are your competitors, and what do you understand that they don't?",
                          moneyMaking: 'How do you/will you make money? How much could you make?',
                          category: 'Which category best applies to your company?',
                        }[name]
                      }
                    </FormLabel>
                    <FormControl>
                      {name === 'category' ? <Input {...field} /> : <Textarea {...field} />}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* Equity */}
            <h2 className="text-xl font-bold">Equity</h2>
            {(['legalEntity', 'investment', 'fundraising'] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={`equity.${name}` as const}
                render={({ field }) =>
                  renderBooleanRadio(
                    field,
                    {
                      legalEntity: 'Have you formed any legal entity?',
                      investment: 'Have you taken any investment?',
                      fundraising: 'Are you currently fundraising?',
                    }[name],
                  )
                }
              />
            ))}
            <FormField
              control={form.control}
              name="equity.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Curious */}
            <h2 className="text-xl font-bold">Curious</h2>
            {(['discovery', 'priorPrograms'] as const).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={`curious.${name}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {
                        {
                          discovery: 'How did you hear about Tab Startup?',
                          priorPrograms:
                            'Have you participated in incubator, accelerator, or similar?',
                        }[name]
                      }
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {/* User ID */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="submit">Submit</Button>
              <Button variant="secondary" type="button">
                Skip
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default IdeaSubmitForm;
