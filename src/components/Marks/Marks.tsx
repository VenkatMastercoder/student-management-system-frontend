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
import { Button } from "@/components/ui/button";
import StudentForm from "@/components/Form/StudentForm";
import MarkForm from "../Form/MarkForm";

const Marks = () => {
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/v1/student`
        );
        setMarksData(response.data.data);
      } catch (error) {
        console.error("Error fetching marks data:", error);
      }
    }
    fetchData();
  }, []);

  const onUpdateMarks = (student_id: any, marks: any) => {
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
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
              
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Introducing Our Dynamic Student Management Dashboard for
                      Seamless Administration and Insightful Analysis.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <StudentForm />
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Total No Students</CardDescription>
              <CardTitle className="text-4xl">{marksData.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Marks</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Student</CardTitle>
                <CardDescription>Recent Add Student into CMS.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>AI</TableHead>
                      <TableHead>WIP</TableHead>
                      <TableHead>DBMS</TableHead>
                      <TableHead>Maths</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Update Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marksData.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.student_name}</TableCell>
                        <TableCell>{(item?.marks?.total_marks)?(item.marks.total_marks):("Null")}</TableCell>
                        <TableCell>{(item?.marks?.subject1)?(item.marks.subject1):("Null")}</TableCell>
                        <TableCell>{(item?.marks?.subject2)?(item.marks.subject2):("Null")}</TableCell>
                        <TableCell>{(item?.marks?.subject3)?(item.marks.subject3):("Null")}</TableCell>
                        <TableCell>{(item?.marks?.subject4)?(item.marks.subject4):("Null")}</TableCell>
                        <TableCell>{(item?.marks?.subject5)?(item.marks.subject5):("Null")}</TableCell>

                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button>Update Marks</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <MarkForm
                                item={item}
                              />
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Marks;
