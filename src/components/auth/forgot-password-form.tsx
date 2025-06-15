
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
  email: z.string().email({ message: "Por favor, ingresa una dirección de correo electrónico válida." }),
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
        title: "Correo de Restablecimiento Enviado",
        description: "Revisa tu bandeja de entrada para encontrar un enlace para restablecer tu contraseña. Si no lo ves, revisa tu carpeta de spam.",
      });
    } catch (error: any) {
      console.error("Error al enviar correo de restablecimiento:", error);
      let errorMessage = "Ocurrió un error desconocido. Por favor, inténtalo de nuevo.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No se encontró ningún usuario con esta dirección de correo electrónico.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Error al Enviar Correo",
        description: errorMessage,
      });
    }
    setIsLoading(false);
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4 p-4 bg-green-500/10 text-green-700 dark:text-green-400 rounded-md">
        <Mail className="h-12 w-12 mx-auto text-primary" />
        <h3 className="text-xl font-semibold">Revisa tu Correo Electrónico</h3>
        <p>Se ha enviado un enlace para restablecer tu contraseña a <strong>{form.getValues("email")}</strong>. Por favor, sigue las instrucciones del correo para restablecer tu contraseña.</p>
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
              <FormLabel>Dirección de Correo Electrónico</FormLabel>
              <FormControl>
                <Input 
                  placeholder="tu@ejemplo.com" 
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
          Enviar Enlace de Restablecimiento
        </Button>
      </form>
    </Form>
  );
}
