
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { AvaLogoIcon } from "@/components/AvaLogoIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal, User, Loader2, BotMessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "agent";
  text: string;
  timestamp: Date;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-agent-message",
      type: "agent",
      text: "¡Hola! Soy AgenteAVA. ¿En qué puedo ayudarte hoy con tu newsletter?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        text: "Estoy procesando tu solicitud... (Respuesta simulada)",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, agentResponse]);
      setIsLoading(false);
      // Re-focus input after agent responds
      inputRef.current?.focus();
    }, 1500);
  };

  return (
    <PageContainer className="flex flex-col min-h-[calc(100vh-4rem)] py-8">
      <section className="text-center mb-12">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 animate-slide-in-up">
          <AvaLogoIcon width={48} height={48} className="text-primary" />
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-3 animate-slide-in-up [animation-delay:0.1s]">
          Chatea con AgenteAVA
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-up [animation-delay:0.2s]">
          Tu asistente IA para la creación de newsletters y mucho más. Haz una pregunta o describe lo que necesitas.
        </p>
      </section>

      <Card className="flex-1 flex flex-col shadow-2xl animate-slide-in-up [animation-delay:0.3s] max-w-3xl w-full mx-auto">
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-26rem)] sm:h-[calc(100vh-24rem)] md:h-[400px] lg:h-[500px] p-4 md:p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end gap-3",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === "agent" && (
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarImage asChild src="/ava_logo.png" alt="AgenteAVA">
                        {/* The AvaLogoIcon is an Image component, so we need to wrap it if used here or provide direct src */}
                         <AvaLogoIcon width={32} height={32} />
                      </AvatarImage>
                      <AvatarFallback className="bg-primary/20">
                        <BotMessageSquare className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-xl px-4 py-3 shadow",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                    <p className={cn(
                        "text-xs mt-1",
                        message.type === "user" ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
                      )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 md:p-6 border-t">
          <form
            onSubmit={handleSubmitMessage}
            className="flex w-full items-center gap-3"
          >
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe tu mensaje a AgenteAVA..."
              className="flex-1 h-11 text-base"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button type="submit" size="lg" className="h-11" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SendHorizonal className="h-5 w-5" />
              )}
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
