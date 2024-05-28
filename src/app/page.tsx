"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email()
          .min(3, "Email should be more than 3 character"),
        password: z.string().min(1, "Password should be more than 1 character"),
      })
    ),
  });

  const onSubmit = async (data: any) => {
    const response = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/student",
    });
    if (response?.ok) {
      toast.success("Login successful!");
      window.location.href = response.url || "/student";
    } else {
      toast.error("Login failed! Check your credentials.");
    }
  };
  return (
    <div className="flex items-center h-screen bg-image">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 col-span-4">{`${errors.email.message}`}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" >Password</Label>
              </div>
              <Input id="password" type="password" placeholder="Enter your password"  {...register("password")} />
              {errors.password && (
                <p className="text-red-500 col-span-4">{`${errors.password.message}`}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
