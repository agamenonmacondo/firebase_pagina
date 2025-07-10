
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogIn, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email({ message: "Dirección de correo electrónico inválida." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);

  const formIsSubmitting = isLoading || isGoogleLoading || isPhoneLoading;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (values.email === "agamenonmacondo@gmail.com" && values.password === "password") {
      login(values.email, "Agamenón Macondo"); 
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "¡Bienvenido de nuevo, Agamenón Macondo!",
      });
      router.push("/"); 
    } else {
      toast({
        variant: "destructive",
        title: "Fallo en el Inicio de Sesión",
        description: "Correo electrónico o contraseña incorrectos. Intenta con agamenonmacondo@gmail.com y password.",
      });
    }
    setIsLoading(false);
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser: User = result.user;
      
      login(firebaseUser.email || "user@example.com", firebaseUser.displayName || "Usuario Google");
      
      toast({
        title: "Inicio de Sesión con Google Exitoso",
        description: `¡Bienvenido, ${firebaseUser.displayName || "Usuario"}!`,
      });
      router.push("/");

    } catch (error: any) {
      console.error("Error durante el inicio de sesión con Google:", error);
      toast({
        variant: "destructive",
        title: "Fallo en el Inicio de Sesión con Google",
        description: error.message || "Ocurrió un error desconocido durante el inicio de sesión con Google.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handlePhoneSignIn = async () => {
    setIsPhoneLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({
      title: "Inicio de Sesión con Teléfono (No Implementado)",
      description: "La funcionalidad de inicio de sesión con teléfono se implementará pronto.",
    });
    setIsPhoneLoading(false);
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="tu@ejemplo.com" {...field} disabled={formIsSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} disabled={formIsSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="rememberMe"
                    disabled={formIsSubmitting}
                  />
                </FormControl>
                <FormLabel htmlFor="rememberMe" className="font-normal cursor-pointer"> 
                  Recordarme
                </FormLabel>
              </FormItem>
            )}
          />
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={formIsSubmitting}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Iniciar Sesión
        </Button>
      </form>
      <div className="my-4 flex items-center">
        <Separator className="flex-1" />
        <span className="mx-4 text-xs text-muted-foreground">O CONTINUAR CON</span>
        <Separator className="flex-1" />
      </div>
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleSignIn}
          disabled={formIsSubmitting}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 110.3 512 0 401.8 0 265.5S110.3 19 244 19c71.1 0 126.6 27.8 172.9 69.8l-69.2 67.3C317.7 131 284.4 115.8 244 115.8c-59.9 0-109.4 49.6-109.4 110.2s49.5 110.2 109.4 110.2c68.5 0 96.5-48.9 99.6-73.7H244v-83.8h235.9c2.3 12.7 3.7 26.6 3.7 42.7z"></path>
            </svg>
          )}
          Iniciar sesión con Google
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handlePhoneSignIn}
          disabled={formIsSubmitting}
        >
          {isPhoneLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Phone className="mr-2 h-4 w-4" />
          )}
          Continuar con Teléfono
        </Button>
      </div>
    </Form>
  );
}
