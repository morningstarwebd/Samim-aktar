'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { addInquiry } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Please describe your reason for visiting (min. 10 characters).",
  }),
  date: z.date({
    required_error: "A preferred date is required.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const steps = [
  { id: 'name', fields: ['name', 'phone'] },
  { id: 'details', fields: ['date', 'message'] },
  { id: 'review', fields: [] },
];

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const watchedValues = useWatch({ control: form.control });

  const goNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as (keyof FormSchema)[], { shouldFocus: true });
    if (output) {
      setCurrentStep(step => step + 1);
    }
  }

  const goPrev = () => setCurrentStep(step => step - 1);

  async function onSubmit(values: FormSchema) {
    setIsSubmitting(true);
    const inquiryData = {
      ...values,
      date: values.date.toISOString(),
    };
    const result = await addInquiry(inquiryData);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Inquiry Sent!",
        description: "Thank you for reaching out. We will contact you shortly.",
      });
      form.reset();
      setCurrentStep(0);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: result.message,
      });
    }
  }

  return (
    <Card className="rounded-2xl p-6 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            {currentStep === 0 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="rounded-xl"/>
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} className="rounded-xl"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "rounded-xl pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setDate(new Date().getDate() - 1))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Annual check-up, feeling unwell..."
                          className="resize-none rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4 text-sm">
                <h3 className="text-lg font-bold">Review Your Inquiry</h3>
                <div className="space-y-2 rounded-xl bg-secondary p-4">
                  <p><strong>Name:</strong> {watchedValues.name}</p>
                  <p><strong>Phone:</strong> {watchedValues.phone}</p>
                  <p><strong>Date:</strong> {watchedValues.date ? format(watchedValues.date, "PPP") : 'Not set'}</p>
                  <p><strong>Reason:</strong> {watchedValues.message}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between pt-4">
            {currentStep > 0 && (
              <Button type="button" onClick={goPrev} variant="outline" className="rounded-xl">
                <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={goNext} className="ml-auto rounded-xl">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="small" /> : 'Confirm & Submit Inquiry'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
