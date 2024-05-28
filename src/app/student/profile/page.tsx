"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Package2,
  PanelLeft,
  Search,
  Settings,
  Users2,
  CalendarCheck2,
  Percent
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SingleStudent from "@/components/Student/SingleStudent";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
export default function Page() {
  const pathname = usePathname();
  console.log(pathname);
  const { data } = useSession() as any;
  
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            {data?.user?.role === "STUDENT" ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/student/profile"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      pathname === "/student/profile" ? "bg-accent" : ""
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Profile</TooltipContent>
              </Tooltip>
            ) : (
              ""
            )}
            {data?.user?.role === "TEACHER" ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/student"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                        pathname === "/student" ? "bg-accent" : ""
                      }`}
                    >
                      <Home className="h-5 w-5" />
                      <span className="sr-only">Dashboard</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/student/marks"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                        pathname === "/student/marks" ? "bg-accent" : ""
                      }`}
                    >
                      <Percent className="h-5 w-5" />
                      <span className="sr-only">Student Marks</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Student Marks</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/student/teachers"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                        pathname === "/student/teachers" ? "bg-accent" : ""
                      }`}
                    >
                      <Users2 className="h-5 w-5" />
                      <span className="sr-only">Teachers </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Teachers </TooltipContent>
                </Tooltip>
              </>
            ) : (
              ""
            )}
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/student"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/student"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Students
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/student">Student</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
          <Button variant="outline" onClick={()=>{signOut()}}>Sign Out</Button>
          </div>
        </header>
        <SingleStudent />
      </div>
    </div>
  );
}
