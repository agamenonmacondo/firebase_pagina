
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setIsLoading(true);
    setEmailSent(false);
    try {
      await sendPasswordResetEmail(auth, values.email);
      setEmailSent(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for a link to reset your password. If you don't see it, check your spam folder.",
      });
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Error Sending Email",
        description: errorMessage,
      });
    }
    setIsLoading(false);
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4 p-4 bg-green-500/10 text-green-700 dark:text-green-400 rounded-md">
        <Mail className="h-12 w-12 mx-auto text-primary" />
        <h3 className="text-xl font-semibold">Check Your Email</h3>
        <p>A password reset link has been sent to <strong>{form.getValues("email")}</strong>. Please follow the instructions in the email to reset your password.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="you@example.com" 
                  {...field} 
                  disabled={isLoading}
                  type="email" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Send Password Reset Link
        </Button>
      </form>
    </Form>
  );
}
