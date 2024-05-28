"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import StudentForm from "@/components/Form/StudentForm";
import EditStudentForm from "@/components/Form/EditStudentForm";
import { FormLabel } from "../ui/form";
import RemoveStudentForm from "../Form/RemoveStudentForm";
import ViewStudentDetails from "./ViewStudentDetails";
import { toast } from "sonner";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/student/`
        );
        if (response.data.success) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  const onSendSMS = async (
    number: any,
    name: any,
    total: any,
    subject1: any,
    subject2: any,
    subject3: any,
    subject4: any,
    subject5: any,
    attendance: any
  ) => {
    const message = `
    Marks and Attendance Details:

    Student Name: ${name}

    Marks:
    - AI: ${subject1 || 0}
    - WID: ${subject2 || 0}
    - DBMS: ${subject3 || 0}
    - Maths: ${subject4 || 0}
    - OS: ${subject5 || 0}

    Total Marks: ${total}

    Attendance: ${attendance}
  `;

    try {
      const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          message: message,
          language: "english",
          route: "q",
          numbers: number,
        },
        {
          headers: {
            authorization:
              "EI4bRpF3S8tFcrRF1fY86YCvECXg2FEblAS3l28qVduGH91Ia65BVIkE5fQI",
          },
        }
      );
  
      toast.success("SMS Sent Successfully");
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const onSendEmail = async (
    email: any,
    name: any,
    mobile_number: any,
    total: any,
    subject1: any,
    subject2: any,
    subject3: any,
    subject4: any,
    subject5: any,
    attendance: any
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEURL}/v1/send`,
        {
          name: name,
          email: email,
          mobile_number: mobile_number,
          total: total,
          subject1: subject1,
          subject2: subject2,
          subject3: subject3,
          subject4: subject4,
          subject5: subject5,
          attendance: attendance,
        }
      );

      toast.success("Email Sent");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Student</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Student Management Dashboard for
                Seamless Administration and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Create Student</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <StudentForm />
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Total No Students</CardDescription>
              <CardTitle className="text-4xl">{students.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Student</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Student</CardTitle>
                <CardDescription>Recent Add Student into CMS.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {/* <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Student Name
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        College Name
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Current Year
                      </TableHead>
                      <TableHead className="text-right">Gmail ID</TableHead>
                      <TableHead className="text-right">
                        Parent Number
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student: any) => (
                      <TableRow key={student.student_id}>
                        <TableCell>{student.student_id}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {student.student_name}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {student.college_name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.current_year}
                        </TableCell>
                        <TableCell className="text-right">
                          {student.gmail_id}
                        </TableCell>
                        <TableCell className="text-right">
                          {student.parent_number}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
                {students.map((data: any) => (
                  <Card key={data.id} className="w-[455px]">
                    <div className="flex justify-between">
                      <CardHeader>
                        <CardTitle>{data.student_name}</CardTitle>
                        <CardDescription>
                          Student ID: {data.student_id}
                        </CardDescription>
                      </CardHeader>
                      <div className="mx-5 flex items-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button>Edit</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Update the student&apos;s data
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <EditStudentForm data={data} />
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <Label>Year: {data.current_year}</Label>
                          <Label>College: {data.college_name}</Label>
                          <Label>Gmail ID: {data.gmail_id}</Label>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={() =>
                          onSendSMS(
                            data.parent_number,
                            data.student_name,
                            data.marks.total_marks,
                            data.marks.subject1,
                            data.marks.subject2,
                            data.marks.subject3,
                            data.marks.subject4,
                            data.marks.subject5,
                            data.attendance
                          )
                        }>
                        Send SMS
                      </Button>
                      <Button
                        onClick={() =>
                          onSendEmail(
                            data.student_name,
                            data.gmail_id,
                            data.parent_number,
                            data.marks.total_marks,
                            data.marks.subject1,
                            data.marks.subject2,
                            data.marks.subject3,
                            data.marks.subject4,
                            data.marks.subject5,
                            data.attendance
                          )
                        }>
                        Send Email
                      </Button>
                      {/* <EditStudentForm/> */}
                      <ViewStudentDetails data={data} />
                      <RemoveStudentForm data={data} />
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Student;
