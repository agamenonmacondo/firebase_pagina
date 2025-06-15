
# AgenteAVA Showcase

Welcome to the AgenteAVA Showcase! This is a Next.js web application designed to demonstrate the capabilities of an AI-powered assistant, AgenteAVA, with a primary focus on tools for newsletter creation and management, along with an interactive chat interface.

## Features

*   **AI-Powered Newsletter Toolkit**:
    *   **Generate Content**: Create SEO-optimized newsletter content based on topic, keywords, tone, and target audience.
    *   **Decide Relevance**: Evaluate if a piece of content is relevant for your newsletter and get AI suggestions for tone and structure.
    *   **Determine Tone & Structure**: Get AI recommendations for the optimal tone and structure of your newsletter.
*   **Interactive Chat Interface**:
    *   Main chat page (`/`) for detailed conversations with AgenteAVA.
    *   Supports text messages and file uploads (images, audio - simulated processing).
    *   Conversation history management within the session.
*   **Global Chat Widget**: A floating chat widget available on most pages for quick interactions (simulated responses).
*   **User Authentication (Mocked)**:
    *   Login page (`/login`) with a mock authentication system.
    *   Protected routes (`/dashboard`, `/newsletter`) accessible after login.
    *   (Note: Designed for easy integration with Firebase Authentication).
*   **Dashboard**: A mock dashboard page (`/dashboard`) for authenticated users, showcasing potential agent statistics and activity.
*   **Portfolio Page**: (`/portfolio`) Displays mock projects and capabilities related to AgenteAVA.
*   **AVA News Page**: (`/project`) Features a curated list of AI-related news articles with SEO optimizations and structured data.
*   **Architecture Overview Page**: (`/architecture`) Provides a technical deep dive into the project's components and systems.
*   **Responsive Design**: The application is designed to be usable across various screen sizes.
*   **Light/Dark Mode Theme**: Easily switch between light and dark themes.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (v15.x with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI Library**: [React](https://react.dev/)
*   **Styling**:
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Shadcn/UI](https://ui.shadcn.com/) (for pre-built, accessible UI components)
*   **AI Integration**:
    *   [Firebase Genkit](https://firebase.google.com/docs/genkit) (for defining and running AI flows)
    *   Google AI / Gemini Models (via Genkit for LLM capabilities)
*   **State Management**:
    *   [Zustand](https://zustand-demo.pmnd.rs/) (for client-side state, e.g., mock authentication)
*   **Schema Validation**: [Zod](https://zod.dev/) (for validating form inputs and AI flow schemas)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Linting/Formatting**: ESLint, Prettier (implied by Next.js standards)

## Project Structure

The project follows a standard Next.js App Router structure:

```
/
├── public/                     # Static assets (images, fonts, etc.)
│   └── images/
│       ├── animated-background.gif # Example for animated background
│       └── ava_hero.png            # Agent avatar
├── src/
│   ├── app/                    # Next.js App Router directory
│   │   ├── (auth)/             # Route group for authentication pages
│   │   │   └── login/
│   │   │       └── page.tsx    # Login page
│   │   ├── (main)/             # Route group for main application pages
│   │   │   ├── dashboard/      # Dashboard page
│   │   │   ├── newsletter/     # Newsletter tools page
│   │   │   ├── portfolio/      # Portfolio page
│   │   │   ├── project/        # AVA News page
│   │   │   ├── architecture/   # Architecture page
│   │   │   ├── layout.tsx      # Layout for main pages
│   │   │   └── page.tsx        # Home page (AVA Assistant Chat UI)
│   │   ├── globals.css         # Global styles and Tailwind CSS theme
│   │   ├── layout.tsx          # Root layout
│   │   └── loading.tsx         # Global loading UI
│   ├── actions/                # Server Actions (e.g., newsletter.ts)
│   ├── ai/                     # Firebase Genkit related code
│   │   ├── flows/              # Genkit flow definitions
│   │   │   ├── decide-newsletter-relevance.ts
│   │   │   ├── determine-newsletter-tone-structure.ts
│   │   │   └── generate-newsletter.ts
│   │   ├── dev.ts              # Genkit development server entry point
│   │   └── genkit.ts           # Genkit initialization and configuration
│   ├── components/             # React components
│   │   ├── auth/               # Authentication-related components (login-form.tsx)
│   │   ├── newsletter/         # Newsletter-specific components
│   │   ├── shared/             # Reusable components (header, footer, etc.)
│   │   └── ui/                 # Shadcn/UI components (button, card, etc.)
│   ├── hooks/                  # Custom React hooks (useAuthStore, useToast)
│   ├── lib/                    # Utility functions and constants (utils.ts, constants.ts)
│   └── services/               # (Placeholder for external service integrations)
├── .env                        # Environment variables (empty by default)
├── apphosting.yaml             # Firebase App Hosting configuration
├── components.json             # Shadcn/UI configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18.x or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project. While this showcase primarily uses mock data and client-side simulations for some features (like authentication), a real-world application using Genkit with Google AI would require API keys.

Example `.env` (for a real Genkit setup, you might need):
```env
# GOOGLE_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY
# Or configure authentication via gcloud CLI for Genkit
```
For this showcase, the `.env` file can remain empty as Genkit is configured to use a free tier model that might not strictly require an explicit API key for basic operations if you've authenticated via `gcloud auth application-default login`.

### Running the Project

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:9002`.

2.  **Start the Genkit development server (in a separate terminal):**
    Genkit flows are usually developed and tested with a local Genkit server.
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes
    npm run genkit:watch
    ```
    The Genkit server will run on a different port (usually `http://localhost:3400` for the inspection UI). The Next.js app calls these flows as server-side Node.js functions.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

### Starting in Production Mode

After building, you can start the application in production mode:
```bash
npm run start
```

## Key Functionalities Explained

### Authentication

*   The application uses a **mock authentication system** managed by a Zustand store (`src/hooks/use-auth-store.ts`).
*   To log in, navigate to `/login` and use the following credentials:
    *   **Email**: `agamenonmacondo@gmail.com`
    *   **Password**: `password`
*   Authenticated routes like `/dashboard` and `/newsletter` will become accessible.
*   The system is designed for straightforward replacement with Firebase Authentication.

### AI Newsletter Tools (`/newsletter`)

This page is accessible after logging in and provides three AI-powered tools:

1.  **Generate Content**: Input a topic, keywords, desired tone, and target audience to generate a newsletter title and content.
2.  **Decide Relevance**: Provide existing content and a newsletter topic. The AI will assess if the content is relevant and suggest a tone/structure.
3.  **Determine Tone & Structure**: Input a newsletter topic, target audience, and (optionally) past performance data. The AI will recommend an optimal tone and structure.

These tools use Server Actions (`src/actions/newsletter.ts`) which in turn call the corresponding Genkit flows defined in `src/ai/flows/`.

### Chat Interface (`/` - Home Page)

*   The main page serves as an interactive chat interface with AgenteAVA.
*   Users can send text messages and "upload" image or audio files.
*   File uploads are simulated on the client-side for this showcase; the file data (as a data URI) is included in the message sent to a mock API endpoint (`/api/chat` - *currently, this endpoint is a placeholder and responses are simulated client-side in the `handleSubmitMessage` function*).
*   Conversations are managed client-side and stored in component state. Multiple conversations can be created and switched between.

### Genkit Flows (`src/ai/flows/`)

*   **`generate-newsletter.ts`**: Defines a Genkit flow that takes newsletter parameters (topic, keywords, tone, audience) and uses an LLM to generate a title and content.
*   **`decide-newsletter-relevance.ts`**: Defines a Genkit flow and tool to evaluate content relevance for a newsletter topic and suggest presentation style.
*   **`determine-newsletter-tone-structure.ts`**: Defines a Genkit flow to recommend newsletter tone and structure based on topic, audience, and performance data.

These flows are called by the Server Actions in `src/actions/newsletter.ts`.

## Styling

*   Global styles, CSS variables for theming (light/dark mode), and Tailwind CSS base layers are defined in `src/app/globals.css`.
*   The application uses Tailwind CSS for most styling, applied directly in the TSX components.
*   Shadcn/UI components are used extensively and can be customized via `globals.css` and `tailwind.config.ts`.
*   An animated GIF background is configured in `globals.css`. Ensure `public/images/animated-background.gif` exists or update the path.

## Future Enhancements / Potential TODOs

*   **Implement Real Firebase Authentication**: Replace the mock auth system.
*   **Connect Chat to Live LangGraph Backend**: Modify `src/app/(main)/page.tsx`'s `handleSubmitMessage` to call a real API endpoint that interacts with a LangGraph agent.
*   **Implement `/api/chat` API Route**: Create the Next.js API route that the chat interface calls, which would then forward requests to a LangGraph agent.
*   **Detailed Dashboard Analytics**: Fetch and display real data on the dashboard.
*   **Functional Portfolio Links**: Update placeholder links in `/portfolio` with actual project/video URLs.
*   **Dynamic News Content**: Fetch news articles for `/project` from a CMS or API instead of using mock data.
*   **Genkit Flow Enhancements**:
    *   Implement actual LLM logic in the `resolve` function of the `decideNewsletterRelevanceTool` in `decide-newsletter-relevance.ts`.
    *   Refine prompts for better and more consistent AI outputs.
    *   Explore using Genkit tools more extensively for complex agentic behavior.

## License

This project is a showcase and is provided as-is. You are free to use and modify the code for learning and demonstration purposes. If you adapt it for production, ensure you secure API keys and handle data responsibly.
(Consider adding a specific license like MIT if you intend to share it more broadly).
```