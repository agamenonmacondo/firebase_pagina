
import { NextResponse, type NextRequest } from 'next/server';

// Define la interfaz para el cuerpo de la solicitud esperada
interface ChatRequestBody {
  message: string;
  conversationId: string;
  fileData?: string; // data URI: "data:<mimetype>;base64,<encoded_data>"
  fileName?: string;
  fileMimeType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    const userMessage = body.message;
    const fileData = body.fileData;
    // const conversationId = body.conversationId; // Podrías usarlo para mantener el contexto

    let responseText = `He recibido tu mensaje: "${userMessage}".`;
    if (fileData && body.fileName) {
      responseText += ` Y también tu archivo: "${body.fileName}".`;
    }
    
    // **SIMULACIÓN DE PROCESAMIENTO DEL BACKEND Y RESPUESTA CON IMAGEN**
    // En una aplicación real, aquí llamarías a tu agente LangGraph o Genkit.
    // El agente procesaría el texto y/o la imagen, y podría generar una imagen.

    // Simulamos que el backend responde con una imagen de marcador de posición.
    const agentGeneratedImageUrl = "https://placehold.co/300x200.png";
    const agentGeneratedImageAlt = "Imagen generada por el Agente AVA";

    // Simula un retraso como si el backend estuviera procesando
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      responseText: `${responseText} (Respuesta simulada desde /api/chat)`,
      imageUrl: agentGeneratedImageUrl, // URL de la imagen que el agente envía de vuelta
      imageAlt: agentGeneratedImageAlt,
    });

  } catch (error) {
    console.error('Error en /api/chat:', error);
    let errorMessage = 'Error desconocido procesando la solicitud.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { message: 'Error interno del servidor', error: errorMessage },
      { status: 500 }
    );
  }
}
