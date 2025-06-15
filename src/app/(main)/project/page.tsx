
"use client";

import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Maximize, Newspaper } from "lucide-react"; // Added Newspaper icon

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
   {
    id: "4",
    title: "Impacto de Genkit en la Creación de Newsletters",
    snippet: "Un análisis de cómo Firebase Genkit está simplificando la integración de IA para la generación automática de contenido en newsletters...",
    fullContent: "Firebase Genkit se está posicionando como una herramienta clave para desarrolladores que buscan incorporar capacidades de IA generativa en sus aplicaciones. Para la creación de newsletters, Genkit ofrece flujos predefinidos y la facilidad de crear flujos personalizados que pueden automatizar la redacción de artículos, la optimización SEO, y la adaptación del tono y estilo al público objetivo. Este artículo explora casos de uso, beneficios y cómo AgenteAVA podría aprovechar Genkit para mejorar su eficiencia.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "Genkit AI newsletter",
    category: "Desarrollo",
    date: "Noviembre 5, 2023"
  },
];


export default function AvaNewsPage() {
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
          <Dialog key={item.id}>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
              <DialogTrigger asChild>
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
                 <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Leer más</Button>
                 </DialogTrigger>
              </div>
            </Card>
            
            <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="font-headline text-2xl md:text-3xl">{item.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {item.category} - {item.date}
                </DialogDescription>
              </DialogHeader>
              <div className="flex-grow overflow-y-auto px-6 pb-6 custom-scrollbar">
                <div className="relative my-4 aspect-video">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    data-ai-hint={item.imageHint}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div
                  className="prose dark:prose-invert max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.fullContent.replace(/\n/g, '<br />') }}
                />
              </div>
              <div className="px-6 py-4 border-t">
                <DialogClose asChild>
                  <Button variant="outline">Cerrar</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      {/* New section for "Último Contenido Generado" */}
      <section className="mt-16 animate-slide-in-up" style={{animationDelay: `${0.2 + mockNewsData.length * 0.1 + 0.2}s`}}>
        <header className="mb-8 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">Contenido Destacado por IA</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un vistazo a los análisis y creaciones recientes de AgenteAVA.
          </p>
        </header>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Newspaper className="h-8 w-8 text-primary mr-3" />
              <CardTitle className="font-headline text-2xl">Análisis Profundo: Tendencias de IA en Marketing</CardTitle>
            </div>
            <CardDescription>
              Generado por AgenteAVA - Basado en los últimos datos y análisis de la industria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              AgenteAVA ha procesado miles de artículos, estudios de caso y discusiones de expertos para identificar las tendencias emergentes en la aplicación de la inteligencia artificial al marketing digital. Este informe destaca cómo la personalización a gran escala, la creación de contenido automatizado y el análisis predictivo de comportamiento del consumidor están redefiniendo las estrategias de las marcas. Se exploran también los desafíos éticos y las oportunidades para las empresas que adopten estas tecnologías de manera proactiva.
              <br /><br />
              <strong>Puntos Clave:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2 pl-4">
              <li>Hiper-personalización y su impacto en la lealtad del cliente.</li>
              <li>El rol de los LLMs en la generación de copys y contenido visual.</li>
              <li>Privacidad de datos vs. efectividad de la IA: Encontrando el equilibrio.</li>
              <li>Casos de éxito y lecciones aprendidas de pioneros en la industria.</li>
            </ul>
            <Button variant="link" className="p-0 h-auto mt-4 text-base">
              Leer el informe completo (Próximamente)
            </Button>
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
