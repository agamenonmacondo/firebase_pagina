import { PageContainer } from "@/components/shared/page-container";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvaLogoIcon } from "@/components/AvaLogoIcon"; // Changed import

export default function LoginPage() {
  return (
    <PageContainer className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-md shadow-2xl animate-slide-in-up">
        <CardHeader className="text-center space-y-2">
          <AvaLogoIcon className="h-12 w-12 mx-auto text-primary" /> {/* Changed component */}
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in to access AgenteAVA's AI newsletter tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
