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
import { useSession } from "next-auth/react";

interface Student {
  student_name: string;
  college_name: string;
  current_year: string;
  gmail_id: string;
  parent_number: string;
  address: string;
  student_id?: string; // if student_id is part of your data structure
  attendance: string;
  marks: {
    total_marks: string;
    subject1: string;
    subject2: string;
    subject3: string;
    subject4: string;
    subject5: string;
  };
}

const SingleStudent = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const { data } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/student`
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


  const selectedStudent = students.find(
    (student) => student?.gmail_id === data?.user?.email
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="sm:col-span-3  " x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Student</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Student Management Dashboard for
                Seamless Administration and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
              
                <AlertDialogContent>
                  <StudentForm />
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
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
                <CardDescription>Student Data into CMS.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <div className="grid gap-4 py-4">
                  <Label>Name:{selectedStudent?.student_name}</Label>

                  <Label>Parent Number: {selectedStudent?.parent_number}</Label>
                  <Label>Attendence: {selectedStudent?.attendance}</Label>
                  <Label>Year: {selectedStudent?.current_year}</Label>
                  <Label>College: {selectedStudent?.college_name}</Label>
                  <Label>Gmail ID: {selectedStudent?.gmail_id}</Label>
                  <Label>
                    Total Marks:{" "}
                    {selectedStudent?.marks?.total_marks
                      ? selectedStudent?.marks.total_marks
                      : "Null"}
                  </Label>
                  <Label>
                    AI:{" "}
                    {selectedStudent?.marks?.subject1
                      ? selectedStudent?.marks.subject1
                      : "Null"}
                  </Label>
                  <Label>
                    WIP:{" "}
                    {selectedStudent?.marks?.subject2
                      ? selectedStudent?.marks.subject2
                      : "Null"}
                  </Label>
                  <Label>
                    DBMS:{" "}
                    {selectedStudent?.marks?.subject3
                      ? selectedStudent?.marks.subject3
                      : "Null"}
                  </Label>
                  <Label>
                    Maths:{" "}
                    {selectedStudent?.marks?.subject4
                      ? selectedStudent?.marks.subject4
                      : "Null"}
                  </Label>
                  <Label>
                    OS:{" "}
                    {selectedStudent?.marks?.subject5
                      ? selectedStudent?.marks.subject5
                      : "Null"}
                  </Label>
                  <Label>Address: {selectedStudent?.address}</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default SingleStudent;
