"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const StudentForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const FormSchema = z.object({
    student_name: z.string().min(2).max(50).optional(),
    college_name: z.string().min(2).max(50).optional(),
    current_year: z.string().min(1).max(1).optional(),
    gmail_id: z.string().email().optional(),
    parent_number: z.string().min(10).max(15).optional(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_name: "",
      college_name: "",
      current_year: "",
      gmail_id: "",
      parent_number: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await axios.post(
        "http://localhost:8001/v1/student/",
        data
      );
      if (response.data.success) {
        toast.success("Student has been created")
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast("Error");
      console.error("Error submitting form:", error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="student_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="college_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter college name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Year</FormLabel>
                <FormControl>
                  <Input placeholder="Enter current year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gmail_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gmail ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Gmail ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter parent number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default StudentForm;
