import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown, UserPlus } from "lucide-react";
import { format, getYear } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/types/contact-form-type";
// import { useMutation } from "@tanstack/react-query";
// import { contactService } from "@/lib/services/contact";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { LoadingState } from "@/components/loading-state";
// import { Separator } from "@/components/ui/separator";
// import { Plus, Trash2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CustomDatePicker from "@/components/custom-ui/custom-calendar";
import { Calendar } from "../ui/calendar";

const AddContact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: new Date(),
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    console.log(values);

    return;
  };

  return (
    // Basic Info
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-none p-0 shadow-sm">
          <Collapsible>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="flex items-center justify-center gap-3">
                <div className="border flex items-center justify-center rounded-sm">
                  <UserPlus className="size-5 m-2" strokeWidth={1.5} />
                </div>
                <CardTitle>Basic Info</CardTitle>
              </div>
              <CollapsibleTrigger className="group/collapsible">
                <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent className="border-t py-4">
              <CardContent className="grid grid-cols-2 gap-4 items-start ">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    // <FormItem>
                    //   <FormLabel className="">Date of Birth</FormLabel>
                    //   {/* <CustomDatePicker /> */}
                    //   <Calendar />
                    //   <FormMessage />
                    // </FormItem>
                    <FormItem className="flex flex-col pt-2">
                      <FormLabel className="mb-[2px]">
                        Company Registration Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
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
                        <PopoverContent className="w-auto p-0" align="end">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            fromDate={new Date(getYear(new Date()) - 100, 0, 1)}
                            toDate={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddContact;
