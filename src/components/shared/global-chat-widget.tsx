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
  SendHorizonal,
  User,
  Loader2,
  BotMessageSquare,
  X,
  ImageUp,
  Mic,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import Link from "next/link";


interface WidgetMessage {
  id: string;
  type: "user" | "agent";
  text: string;
  timestamp: Date;
  fileName?: string;
  fileType?: "image" | "audio";
}

export function GlobalChatWidget() {
  const pathname = usePathname();
  const router = useRouter(); // Added router

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
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

  const addMessageToWidget = (message: WidgetMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = async (e?: FormEvent<HTMLFormElement>, text?: string, file?: { name: string, type: "image" | "audio" }) => {
    if (e) e.preventDefault();
    const messageText = text || inputValue.trim();
    if ((!messageText && !file) || isLoading) return;

    const userMessage: WidgetMessage = {
      id: crypto.randomUUID(),
      type: "user",
      text: messageText,
      timestamp: new Date(),
      fileName: file?.name,
      fileType: file?.type,
    };

    addMessageToWidget(userMessage);
    if (!text) setInputValue("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      let responseText = `He recibido tu mensaje: "${messageText}". Estoy procesando... (Respuesta simulada desde el widget)`;
      if (file) {
        responseText = `He recibido tu archivo: "${file.name}". Y tu mensaje: "${messageText || '(sin texto adicional)'}". Estoy procesando... (Respuesta simulada desde el widget)`;
      }
      const agentResponse: WidgetMessage = {
        id: crypto.randomUUID(),
        type: "agent",
        text: responseText,
        timestamp: new Date(),
      };
      addMessageToWidget(agentResponse);
      setIsLoading(false);
      inputRef.current?.focus();
    }, 1500);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: "image" | "audio") => {
    const file = event.target.files?.[0];
    if (file) {
      // For widget, we'll just show a toast and add a message with file info
      // The actual data isn't sent to any backend in this simulated version.
      const fileInfoMessage = inputValue.trim() || `Archivo adjunto: ${file.name}`;
      
      handleSendMessage(undefined, fileInfoMessage, { name: file.name, type: fileType });
      
      toast({
        title: fileType === "image" ? "Imagen Adjuntada (Widget)" : "Audio Adjuntado (Widget)",
        description: `${file.name} listo para enviar con tu mensaje.`,
      });
      // Clear the input value for the file input to allow selecting the same file again
      event.target.value = "";
    }
  };

  const handleExpandToMainChat = () => {
    router.push('/');
    setIsOpen(false); // Close the popover widget
  };

  // Don't render the widget on the main chat page itself
  if (pathname === '/') {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 p-0 overflow-hidden border-2 border-background dark:border-primary/50 focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Abrir chat de AgenteAVA"
        >
          <Image 
            src="/images/ava_hero.png" 
            alt="AgenteAVA chat" 
            width={64}
            height={64}
            className="object-cover h-full w-full"
            data-ai-hint="female avatar"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 md:w-96 h-[500px] p-0 flex flex-col shadow-2xl rounded-lg border-border bg-card"
        onOpenAutoFocus={(e) => e.preventDefault()} 
      >
        <header className="flex items-center justify-between p-4 border-b bg-muted/50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/ava_hero.png" alt="AgenteAVA" data-ai-hint="female avatar"/>
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
                    <AvatarImage src="/images/ava_hero.png" alt="AgenteAVA" data-ai-hint="female avatar"/>
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
                  {message.fileType && message.type === 'user' && (
                    <div className="mb-1 p-1.5 border border-dashed rounded-md bg-black/5 dark:bg-white/5 text-xs">
                      {message.fileType === 'image' ? <ImageUp className="inline h-3 w-3 mr-1.5" /> : <Mic className="inline h-3 w-3 mr-1.5" />}
                      {message.fileName}
                    </div>
                  )}
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
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={() => imageInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar imagen">
            <ImageUp className="h-4 w-4" />
          </Button>
          <input type="file" ref={imageInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
          
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={() => audioInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar audio">
            <Mic className="h-4 w-4" />
          </Button>
          <input type="file" ref={audioInputRef} accept="audio/*" onChange={(e) => handleFileUpload(e, "audio")} className="hidden" />

          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 h-9 text-sm"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={handleExpandToMainChat} aria-label="Expandir chat">
            <ExternalLink className="h-4 w-4" />
          </Button>
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
