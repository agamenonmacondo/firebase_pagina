
"use client";

import { useState, useRef, useEffect, type FormEvent, useCallback } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  SendHorizonal,
  User,
  Loader2,
  BotMessageSquare,
  MessageSquarePlus,
  PanelLeftOpen,
  Paperclip,
  ImageUp,
  Mic,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: "user" | "agent";
  text: string;
  timestamp: Date;
  // User uploaded file/image
  fileName?: string;
  fileType?: "image" | "audio" | "other";
  userImageUrl?: string; 
  userImageAlt?: string;
  // Agent sent image
  agentImageUrl?: string;
  agentImageAlt?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function HomePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const currentMessages = conversations.find(c => c.id === currentConversationId)?.messages || [];

  const createNewConversation = useCallback(() => {
    const newConversationId = crypto.randomUUID();
    const newConversation: Conversation = {
      id: newConversationId,
      title: "Nueva Conversación",
      messages: [
        {
          id: crypto.randomUUID(),
          type: "agent",
          text: "¡Hola! Soy AgenteAVA. ¿En qué puedo ayudarte hoy con tu newsletter?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())]);
    setCurrentConversationId(newConversationId);
    inputRef.current?.focus();
    setIsMobileSidebarOpen(false);
    return newConversationId;
  }, []);

  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    } else if (!currentConversationId && conversations.length > 0) {
      setCurrentConversationId(conversations.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())[0].id);
    }
  }, [conversations, currentConversationId, createNewConversation]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [currentMessages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentConversationId]);

  const updateConversationMessages = (convId: string, newMessages: Message[], newTitle?: string) => {
    setConversations(prevConvs =>
      prevConvs.map(conv =>
        conv.id === convId
          ? { ...conv, messages: newMessages, title: newTitle || (newMessages.find(m => m.type === 'user' && m.text)?.text.substring(0,30) + "...") || conv.title }
          : conv
      ).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
    );
  };

  const addMessageToCurrentConversation = (message: Message) => {
    if (!currentConversationId) return;
    const currentConv = conversations.find(c => c.id === currentConversationId);
    if (!currentConv) return;

    const updatedMessages = [...currentConv.messages, message];
    const newTitle = currentConv.messages.length === 1 && message.type === 'user' && message.text
      ? message.text.substring(0, 30) + "..."
      : currentConv.title;
      
    updateConversationMessages(currentConversationId, updatedMessages, newTitle);
  };

  const handleSubmitMessage = async (e?: FormEvent<HTMLFormElement>, text?: string, file?: {name: string, type: "image" | "audio" | "other", dataUrl?: string }) => {
    if (e) e.preventDefault();
    const messageText = text || inputValue.trim();
    if ((!messageText && !file) || isLoading || !currentConversationId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: "user",
      text: messageText,
      timestamp: new Date(),
      fileName: file?.name,
      fileType: file?.type,
      userImageUrl: file?.type === 'image' ? file.dataUrl : undefined,
      userImageAlt: file?.type === 'image' ? file.name : undefined,
    };

    addMessageToCurrentConversation(userMessage);

    if (!text) setInputValue(""); 
    setIsLoading(true);

    try {
      const payload: any = {
        message: messageText,
        conversationId: currentConversationId,
      };

      if (file && file.dataUrl) {
        payload.fileData = file.dataUrl; 
        payload.fileName = file.name;
        payload.fileMimeType = file.dataUrl.substring(file.dataUrl.indexOf(':') + 1, file.dataUrl.indexOf(';'));
      }

      const response = await fetch('/api/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorResponseMessage = `Error HTTP: ${response.status}`;
        try {
          const errorData = await response.json();
          errorResponseMessage = errorData.message || errorData.error || errorResponseMessage;
        } catch (jsonError) {
          // If body is not JSON or empty
        }
        throw new Error(errorResponseMessage);
      }

      const agentResponseData = await response.json();

      const agentMessage: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        text: agentResponseData.responseText || "No se recibió una respuesta válida del agente.",
        timestamp: new Date(),
        agentImageUrl: agentResponseData.imageUrl,
        agentImageAlt: agentResponseData.imageAlt || "Imagen del Agente",
      };
      addMessageToCurrentConversation(agentMessage);

    } catch (error) {
      console.error("Error al contactar al agente:", error);
      const errorMessageText = error instanceof Error ? `Error: ${error.message}` : "Hubo un problema al conectar con el agente.";
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        type: "agent",
        text: errorMessageText,
        timestamp: new Date(),
      };
      addMessageToCurrentConversation(errorMessage);
      toast({
        variant: "destructive",
        title: "Error de Conexión",
        description: errorMessageText,
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: "image" | "audio" | "other") => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        
        handleSubmitMessage(undefined, inputValue.trim() || `Archivo adjunto: ${file.name}`, { name: file.name, type: fileType, dataUrl: dataUrl });
        setInputValue(""); 
        toast({
          title: fileType === "image" ? "Imagen Adjuntada" : "Archivo Adjuntado",
          description: `${file.name} procesándose.`,
        });
      };
      reader.readAsDataURL(file); 
      event.target.value = ""; 
    }
  };
  
  const handleDeleteConversation = (e: React.MouseEvent, convId: string) => {
    e.stopPropagation(); 
    setConversations(prev => prev.filter(c => c.id !== convId));
    if (currentConversationId === convId) {
      const remainingConversations = conversations.filter(c => c.id !== convId);
      if (remainingConversations.length > 0) {
        setCurrentConversationId(remainingConversations.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())[0].id);
      } else {
        createNewConversation(); 
      }
    }
    toast({
      title: "Conversación Eliminada",
      description: "La conversación ha sido eliminada.",
    });
  };


  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-muted/50">
      <div className="p-4 border-b">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full">
              <MessageSquarePlus className="mr-2 h-5 w-5" /> Nuevo Chat
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Iniciar Nueva Conversación?</AlertDialogTitle>
              <AlertDialogDescription>
                Esto creará una nueva sesión de chat. ¿Estás seguro?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={createNewConversation}>Crear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Accordion type="single" collapsible defaultValue="conversations" className="flex-1 overflow-y-auto">
        <AccordionItem value="conversations" className="border-b-0">
          <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline justify-start [&[data-state=open]>svg]:ml-auto">
            Historial de Chats
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-full max-h-[calc(100vh-18rem)]"> {/* Adjust max-height as needed */}
              <div className="px-4 pb-4 space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={cn(
                      buttonVariants({ variant: currentConversationId === conv.id ? "secondary" : "ghost" }),
                      "w-full justify-between h-auto py-2 cursor-pointer flex items-center"
                    )}
                    onClick={() => {
                      setCurrentConversationId(conv.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentConversationId(conv.id);
                        setIsMobileSidebarOpen(false);
                      }
                    }}
                  >
                    <span className="truncate text-left flex-1 pr-2">{conv.title}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 shrink-0"
                      onClick={(e) => handleDeleteConversation(e, conv.id)}
                      aria-label="Eliminar conversación"
                    >
                      <Trash2 className="h-4 w-4 text-destructive/70 hover:text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="p-4 border-t text-center">
        <p className="text-xs text-muted-foreground">AgenteAVA v1.0</p>
      </div>
    </div>
  );

  return (
    <PageContainer className="flex flex-col min-h-[calc(100vh-4rem)] p-0 md:flex-row">
      <div className="md:hidden p-2 border-b">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:block md:w-80 lg:w-96 border-r">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col bg-background">
        <Card className="flex-1 flex flex-col shadow-none border-0 rounded-none max-w-full w-full mx-auto">
          {currentConversationId && conversations.find(c=>c.id === currentConversationId) ? (
            <>
              <CardHeader className="border-b md:hidden">
                 <CardTitle className="font-headline text-xl truncate">
                    {conversations.find(c=>c.id === currentConversationId)?.title || "Chat"}
                 </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-18rem)] sm:h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)] p-4 md:p-6" ref={scrollAreaRef}>
                  <div className="space-y-6">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex items-end gap-3",
                          message.type === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.type === "agent" && (
                          <Avatar className="h-8 w-8 border border-primary/20 shrink-0">
                            <AvatarImage src="/images/ava_hero.png" alt="AgenteAVA" />
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
                          {message.userImageUrl && message.type === 'user' && ( 
                            <div className="mb-2">
                              <Image
                                src={message.userImageUrl} 
                                alt={message.userImageAlt || "Imagen del usuario"}
                                width={300} 
                                height={200} 
                                className="rounded-md object-cover"
                                data-ai-hint="user uploaded image"
                              />
                            </div>
                          )}
                          {message.fileName && message.type === 'user' && message.fileType !== 'image' && (
                             <div className="mb-1 p-2 border border-dashed rounded-md bg-black/10 dark:bg-white/10">
                                <p className="text-xs font-medium flex items-center">
                                {message.fileType === 'audio' ? <Mic className="h-4 w-4 mr-2 shrink-0" /> : <Paperclip className="h-4 w-4 mr-2 shrink-0" />}
                                {message.fileName}
                                </p>
                            </div>
                          )}
                          {message.text && (
                            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                          )}
                          {message.type === "agent" && message.agentImageUrl && (
                            <div className="mt-2">
                              <Image
                                src={message.agentImageUrl}
                                alt={message.agentImageAlt || "Imagen del Agente"}
                                width={300} 
                                height={200} 
                                className="rounded-md object-cover"
                                data-ai-hint="agent response image"
                              />
                            </div>
                           )}
                          <p className={cn(
                              "text-xs mt-1",
                              message.type === "user" ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
                            )}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.type === "user" && (
                          <Avatar className="h-8 w-8 shrink-0">
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
              <CardFooter className="p-2 md:p-3 border-t">
                <form
                  onSubmit={handleSubmitMessage}
                  className="flex w-full items-center gap-2"
                >
                  <div className="flex gap-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar imagen">
                      <ImageUp className="h-5 w-5" />
                    </Button>
                    <input type="file" ref={imageInputRef} accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
                    
                    <Button type="button" variant="ghost" size="icon" onClick={() => audioInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar audio">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <input type="file" ref={audioInputRef} accept="audio/*" onChange={(e) => handleFileUpload(e, "audio")} className="hidden" />

                    <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={isLoading} aria-label="Adjuntar archivo">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, "other")} className="hidden" />
                  </div>
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje a AgenteAVA..."
                    className="flex-1 h-10 text-base"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10" disabled={isLoading || (!inputValue.trim() && !currentMessages.find(m => m.type === 'user' && m.fileName))}>
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <SendHorizonal className="h-5 w-5" />
                    )}
                    <span className="sr-only">Enviar</span>
                  </Button>
                </form>
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BotMessageSquare className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Selecciona una conversación o inicia una nueva.</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="mt-4">
                      <MessageSquarePlus className="mr-2 h-5 w-5" /> Iniciar Nuevo Chat
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Iniciar Nueva Conversación?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esto creará una nueva sesión de chat. ¿Estás seguro?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={createNewConversation}>Crear</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          )}
        </Card>
      </main>
    </PageContainer>
  );
}
    
    

    


