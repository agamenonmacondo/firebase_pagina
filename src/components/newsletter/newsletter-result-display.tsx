import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Info, Type, MessageSquare, BarChart2, AlertCircle } from "lucide-react";

interface NewsletterResultDisplayProps {
  title: string;
  data: Record<string, any> | null;
  error?: string | null;
}

const getIcon = (key: string) => {
  if (key.toLowerCase().includes("title")) return <Type className="h-5 w-5 text-primary" />;
  if (key.toLowerCase().includes("content") || key.toLowerCase().includes("explanation")) return <MessageSquare className="h-5 w-5 text-primary" />;
  if (key.toLowerCase().includes("tone")) return <Info className="h-5 w-5 text-primary" />;
  if (key.toLowerCase().includes("structure")) return <CheckCircle className="h-5 w-5 text-primary" />;
  if (key.toLowerCase().includes("score")) return <BarChart2 className="h-5 w-5 text-primary" />;
  return <Info className="h-5 w-5 text-primary" />;
};

export function NewsletterResultDisplay({ title, data, error }: NewsletterResultDisplayProps) {
  if (error) {
    return (
      <Card className="mt-6 border-destructive bg-destructive/10">
        <CardHeader>
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-destructive mr-2" />
            <CardTitle className="text-destructive">Error</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="mt-8 shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription>Here's the AI-generated result based on your input.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="p-4 border rounded-md bg-muted/30">
            <div className="flex items-center mb-2">
              {getIcon(key)}
              <h4 className="font-semibold capitalize ml-2 text-lg">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
            </div>
            {typeof value === 'boolean' ? (
              <p className={value ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                {value ? "Yes" : "No"}
              </p>
            ) : typeof value === 'string' && value.length > 200 ? (
               <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words text-muted-foreground">
                {value}
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap break-words">{String(value)}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
