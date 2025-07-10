
import type { Metadata } from 'next';
import { PageContainer } from "@/components/shared/page-container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Maximize, Newspaper } from "lucide-react";

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

// Helper function to parse Spanish date strings to ISO format
// This needs to be defined at the module scope to be used in `metadata`
function parseSpanishDateToISO(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length < 3) return new Date().toISOString(); // Fallback

  const monthName = parts[0].toLowerCase();
  const day = parseInt(parts[1].replace(",", ""), 10);
  const year = parseInt(parts[2], 10);

  const monthMap: { [key: string]: number } = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };

  const month = monthMap[monthName];

  if (isNaN(day) || isNaN(year) || month === undefined) {
    return new Date().toISOString(); // Fallback for invalid dates
  }
  return new Date(year, month, day).toISOString();
}

const pageTitle = "AVA News - Últimas Noticias y Análisis de IA | AgenteAVA";
const pageDescription = "Mantente al día con las últimas noticias, tendencias y análisis sobre Inteligencia Artificial, curadas y generadas por AgenteAVA. Artículos sobre IA en marketing, ética, y más.";
const pageKeywords = "inteligencia artificial, IA, noticias de IA, AgenteAVA, Genkit, LangGraph, marketing digital, ética en IA, tendencias tecnológicas";
const canonicalUrl = "/project"; // Assuming this is the final path. Update if path changes.
const siteName = "AgenteAVA Showcase";
const ogImageUrl = "https://placehold.co/1200x630.png"; // Generic OG image
const publisherLogoUrl = "/images/ava_hero.png"; // Assumes this is in public/images/


export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: pageKeywords,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Noticias de Inteligencia Artificial de AgenteAVA",
      },
    ],
    type: 'website', // This page lists articles, so 'website' or 'blog' is appropriate
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImageUrl],
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "AgenteAVA",
        "logo": {
          "@type": "ImageObject",
          "url": publisherLogoUrl 
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": mockNewsData.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "NewsArticle",
            "headline": item.title,
            "url": `${canonicalUrl}#${item.id}`, // Ideal: unique URL per article. Current: fragment.
            "image": item.imageUrl,
            "datePublished": parseSpanishDateToISO(item.date),
            "dateModified": parseSpanishDateToISO(item.date), // Assuming no separate modified date for mock
            "description": item.snippet,
            "author": {
              "@type": "Organization",
              "name": "AgenteAVA"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AgenteAVA",
              "logo": {
                "@type": "ImageObject",
                "url": publisherLogoUrl
              }
            }
          }
        }))
      }
    }),
  },
};


export default function AvaNewsPage() {
  return (
    <PageContainer className="py-8 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 animate-slide-in-up">{pageTitle.split('|')[0].trim()}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-up [animation-delay:0.1s]">
          {pageDescription.split('.')[0]}.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockNewsData.map((item, index) => (
          <Dialog key={item.id}>
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slide-in-up" style={{animationDelay: `${0.2 + index * 0.1}s`}} id={item.id}>
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
                <article> {/* Added article tag for semantic content */}
                  <div
                    className="prose dark:prose-invert max-w-none text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.fullContent.replace(/\n/g, '<br />') }}
                  />
                </article>
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
    </PageContainer>
  );
}
