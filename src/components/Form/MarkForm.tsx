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

const MarkForm = ({ item }: any) => {
  const FormSchema = z.object({
    subject1: z.string().min(1),
    subject2: z.string().min(1),
    subject3: z.string().min(1),
    subject4: z.string().min(1),
    subject5: z.string().min(1),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject1: item.marks.subject1 || "0",
      subject2: item.marks.subject2 || "0",
      subject3: item.marks.subject3 || "0",
      subject4: item.marks.subject4 || "0",
      subject5: item.marks.subject5 || "0",
    },
  });
  console.log(item);
  const onSubmit = async (data: any) => {
    console.log("from", data);
    try {
      const totalMarks = (
        Number(data.subject1) +
        Number(data.subject2) +
        Number(data.subject3) +
        Number(data.subject4) +
        Number(data.subject5)
      ).toString();

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/marks/${item.student_id}`,
        {
          total_marks: totalMarks,
          subject1: data.subject1,
          subject2: data.subject2,
          subject3: data.subject3,
          subject4: data.subject4,
          subject5: data.subject5,
        }
      );

      if (response.data.success) {
        toast({
          title: "Marks Updated!",
          description: "Data has been submitted to the server.",
        });
        location.reload();
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
          className="w-2/3 space-y-6"
        >
          <FormItem>
            <FormLabel>AI</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter AI Marks"
                {...form.register("subject1")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>WIP</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter WIP Marks"
                {...form.register("subject2")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>DBMS</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter DBMS Marks"
                {...form.register("subject3")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Maths</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter Maths Marks"
                {...form.register("subject4")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>OS</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter OS Marks"
                {...form.register("subject5")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="flex gap-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Update Marks</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MarkForm;
