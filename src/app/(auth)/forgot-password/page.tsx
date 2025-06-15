
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AvaLogoIcon } from "@/components/AvaLogoIcon";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <PageContainer className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-md shadow-2xl animate-slide-in-up">
        <CardHeader className="text-center space-y-2">
          <AvaLogoIcon className="h-12 w-12 mx-auto text-primary" />
          <CardTitle className="font-headline text-3xl">¿Olvidaste Tu Contraseña?</CardTitle>
          <CardDescription>Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-4">
          <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Iniciar Sesión
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
