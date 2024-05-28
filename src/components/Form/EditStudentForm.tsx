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

const StudentForm = (data: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const FormSchema = z.object({
    student_name: z.string().min(2).max(50).optional(),
    college_name: z.string().min(2).max(50).optional(),
    current_year: z.string().min(1).max(1).optional(),
    gmail_id: z.string().email().optional(),
    parent_number: z.string().min(10).max(15).optional(),
    address: z.string().min(1),
    attendence: z.string().min(1),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_name: data.data.student_name,
      college_name: data.data.college_name,
      current_year: data.data.current_year,
      gmail_id: data.data.gmail_id,
      parent_number: data.data.parent_number,
      address: data.data.address,
      attendence: data.data.attendance,
    },
  });

  async function onSubmit(datas: any) {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/student/${data.data.student_id}`,
        datas
      );
      if (response.data) {
        toast.success("Student has been updated");
        setIsDialogOpen(false);
        location.reload();
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
          className=" space-y-6"
        >
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
          <div className="flex  justify-between space-x-4 ">
            <FormField
              control={form.control}
              name="attendence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attendence</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter student's attendence percentage"
                      {...field}
                    />
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
          </div>

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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button type="submit">Update Student</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default StudentForm;
