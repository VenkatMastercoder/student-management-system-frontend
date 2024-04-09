"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

const MarkForm = ({ student_id, marks, mark_id }: any) => {
  const FormSchema = z.object({
    student_id: z.string().min(1).max(50).optional(),
    total_marks: z.string().min(1).max(3).optional(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_id: student_id || "",
      total_marks: marks || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.put(
        "http://localhost:8001/v1/marks/" + mark_id,
        data
      );
      if (response.data.success) {
        toast({
          title: "Form Submitted Successfully!",
          description: "Data has been submitted to the server.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again later.",
      });
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6">
          <FormItem>
            <FormLabel>Student ID</FormLabel>
            <FormControl>
              <Input
                disabled
                placeholder="Enter student ID"
                {...form.register("student_id")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Total Marks</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter total marks"
                {...form.register("total_marks")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Add Student</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MarkForm;
