
import { PageContainer } from "@/components/shared/page-container";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AvaLogoIcon } from "@/components/AvaLogoIcon";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <PageContainer className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-md shadow-2xl animate-slide-in-up">
        <CardHeader className="text-center space-y-2">
          <AvaLogoIcon className="h-12 w-12 mx-auto text-primary" />
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in with your email, Google, or phone to access AgenteAVA's AI newsletter tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-4">
          <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
