
"use client";

import { useState } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XIcon, Maximize } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  fullContent: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  date: string;
}

const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "El Futuro de la IA en la Creación de Contenidos Multimedia",
    snippet: "Descubre cómo las nuevas inteligencias artificiales están revolucionando la forma en que se generan imágenes, videos y música, abriendo un nuevo paradigma creativo...",
    fullContent: "El avance exponencial de los modelos de IA generativa está transformando radicalmente el panorama de la creación de contenidos. Desde la generación de imágenes fotorrealistas a partir de descripciones textuales hasta la composición de piezas musicales originales y la creación de avatares digitales indistinguibles de los humanos, las posibilidades son infinitas. Herramientas como DALL-E 3, Midjourney y los modelos de generación de video de Google y Meta están democratizando el acceso a capacidades creativas que antes requerían equipos especializados y grandes presupuestos. Este artículo explora las implicaciones éticas, los desafíos técnicos y el potencial ilimitado de esta nueva era.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "AI creative tools",
    category: "Inteligencia Artificial",
    date: "Octubre 26, 2023"
  },
  {
    id: "2",
    title: "Agentes Autónomos de IA: ¿La Próxima Revolución Laboral?",
    snippet: "Los agentes de IA capaces de realizar tareas complejas de forma autónoma están comenzando a emerger. Analizamos su impacto potencial en el mercado laboral...",
    fullContent: "Imagina un asistente personal de IA que no solo agenda tus reuniones, sino que también investiga temas, redacta borradores de correos electrónicos y gestiona proyectos complejos con mínima supervisión. Esta es la promesa de los agentes autónomos de IA, sistemas que pueden comprender objetivos, planificar pasos y ejecutar tareas en el mundo digital e incluso físico. Empresas como Adept AI y OpenAI están liderando el desarrollo de estos agentes, que podrían automatizar una amplia gama- de trabajos de conocimiento. Si bien esto plantea preocupaciones sobre el desplazamiento laboral, también abre oportunidades para aumentar la productividad humana y crear nuevos roles centrados en la supervisión y el diseño de estos sistemas.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "AI workforce automation",
    category: "Tecnología",
    date: "Octubre 24, 2023"
  },
  {
    id: "3",
    title: "La Ética en la IA: Navegando los Desafíos de un Mundo Inteligente",
    snippet: "A medida que la IA se vuelve más omnipresente, las discusiones sobre su uso ético y responsable son más cruciales que nunca. Abordamos los dilemas clave...",
    fullContent: "Desde los sesgos algorítmicos que pueden perpetuar la discriminación hasta las preocupaciones sobre la privacidad en la era de la vigilancia masiva y el potencial de las armas autónomas, la IA presenta dilemas éticos complejos. Es fundamental establecer marcos regulatorios sólidos, promover la transparencia en los algoritmos y fomentar una cultura de desarrollo responsable. Organizaciones como la AI Ethics Lab y el Future of Life Institute están trabajando para guiar el desarrollo de la IA de manera que beneficie a toda la humanidad. Este artículo profundiza en los debates actuales y las posibles soluciones para garantizar que la IA se desarrolle de manera segura y equitativa.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "AI ethics debate",
    category: "Sociedad",
    date: "Octubre 20, 2023"
  },
];

export default function AvaNewsPage() {
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (item: NewsItem) => {
    setSelectedNewsItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedNewsItem(null);
  };

  return (
    <PageContainer className="py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">AVA News</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          Las últimas noticias y análisis sobre Inteligencia Artificial, curadas y generadas por AgenteAVA.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockNewsData.map((item, index) => (
          <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
            <DialogTrigger asChild onClick={() => openDialog(item)}>
              <div className="relative cursor-pointer group">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  data-ai-hint={item.imageHint}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize className="h-12 w-12 text-white" />
                </div>
              </div>
            </DialogTrigger>
            <CardHeader>
              <CardTitle className="font-headline text-xl line-clamp-2">{item.title}</CardTitle>
              <div className="text-xs text-muted-foreground pt-1">
                <span>{item.category}</span> - <span>{item.date}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{item.snippet}</p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button variant="outline" className="w-full" onClick={() => openDialog(item)}>Leer más</Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedNewsItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="font-headline text-2xl md:text-3xl">{selectedNewsItem.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {selectedNewsItem.category} - {selectedNewsItem.date}
              </DialogDescription>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto px-6 pb-6 custom-scrollbar">
              <div className="relative my-4 aspect-video">
                <Image
                  src={selectedNewsItem.imageUrl}
                  alt={selectedNewsItem.title}
                  data-ai-hint={selectedNewsItem.imageHint}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div
                className="prose dark:prose-invert max-w-none text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedNewsItem.fullContent.replace(/\n/g, '<br />') }}
              />
            </div>
            <div className="px-6 py-4 border-t">
              <DialogClose asChild>
                <Button variant="outline" onClick={closeDialog}>Cerrar</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageContainer>
  );
}
