
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MessageCircle,
  SendHorizonal,
  User,
  Loader2,
  BotMessageSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation"; // Added import

interface WidgetMessage {
  id: string;
  type: "user" | "agent";
  text: string;
  timestamp: Date;
}

export function GlobalChatWidget() {
  const pathname = usePathname(); // Get current pathname

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          type: "agent",
          text: "¡Hola! Soy AgenteAVA. ¿En qué puedo ayudarte?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const messageText = inputValue.trim();
    if (!messageText || isLoading) return;

    const userMessage: WidgetMessage = {
      id: crypto.randomUUID(),
      type: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: WidgetMessage = {
        id: crypto.randomUUID(),
        type: "agent",
        text: `He recibido tu mensaje: "${messageText}". Estoy procesando... (Respuesta simulada desde el widget)`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsLoading(false);
      inputRef.current?.focus();
    }, 1500);
  };

  // Hide widget if on the main chat page ('/')
  if (pathname === '/') {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          aria-label="Abrir chat de AgenteAVA"
        >
          {isOpen ? (
            <X className="h-7 w-7 text-primary-foreground" />
          ) : (
            <MessageCircle className="h-7 w-7 text-primary-foreground" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 md:w-96 h-[500px] p-0 flex flex-col shadow-2xl rounded-lg border-border bg-card"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevents Popover from stealing focus initially
      >
        <header className="flex items-center justify-between p-4 border-b bg-muted/50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/ava_hero.png" alt="AgenteAVA" data-ai-hint="female avatar" />
              <AvatarFallback className="bg-primary/20">
                <BotMessageSquare className="h-5 w-5 text-primary" />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-sm text-card-foreground">Chat con AgenteAVA</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar chat</span>
          </Button>
        </header>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2.5",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.type === "agent" && (
                  <Avatar className="h-7 w-7 border border-primary/20 shrink-0">
                    <AvatarImage src="/images/ava_hero.png" alt="AgenteAVA" data-ai-hint="female avatar" />
                    <AvatarFallback className="bg-primary/20">
                      <BotMessageSquare className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg px-3 py-2 shadow-sm text-sm",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-card-foreground rounded-bl-none"
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  <p className={cn(
                      "text-xs mt-1 opacity-70",
                      message.type === "user" ? "text-right" : "text-left"
                    )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === "user" && (
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 p-3 border-t bg-muted/30 rounded-b-lg"
        >
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 h-9 text-sm"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
