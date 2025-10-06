import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"

// Maximum duration for AI responses
export const maxDuration = 30

// --- Tools --- //

const getSamakiCashHelpTool = tool({
  description: "Get help information about SamakiCash features and services",
  inputSchema: z.object({
    topic: z.string().describe("The topic the user needs help with"),
  }),
  execute: async ({ topic }) => {
    const helpTopics: Record<string, string> = {
      "upload fish photos":
        'To upload fish photos: 1) Go to Dashboard, 2) Click "Add Catch", 3) Take or select photo, 4) Our AI will analyze and provide price recommendations.',
      "credit score":
        "Your credit score is calculated based on fishing activity, loan repayment, catch reporting, and engagement. Check it in the Credit section.",
      insurance:
        "We offer boat, equipment, catch, and personal accident insurance. Get quotes in the Insurance section.",
      "offline mode":
        "SamakiCash works offline! You can log catches and view data without internet. Sync occurs when you reconnect.",
      pricing:
        "Our AI analyzes your fish photos to identify species, size, and quality, then gives market-based pricing recommendations.",
      loans:
        "Access microloans based on credit score and fishing history. Apply in the Credit section.",
    }

    const lowerTopic = topic.toLowerCase()
    for (const [key, value] of Object.entries(helpTopics)) {
      if (lowerTopic.includes(key)) return value
    }

    return "I can help you with uploading photos, checking credit scores, insurance, offline mode, pricing, and loans. Which topic would you like to know more about?"
  },
})

const connectToHumanTool = tool({
  description: "Connect the user to human support for personalized assistance",
  inputSchema: z.object({
    reason: z.string().describe("Why the user needs human support"),
  }),
  execute: async ({ reason }) => {
    return `Connecting you to human support for: ${reason}. Call +255 123 456 789 or email support@samakicash.com for immediate assistance.`
  },
})

// --- API Route --- //

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // System message to set context and personality
  const systemMessage: UIMessage = {
    id: "system",
    role: "system",
    parts: [
      {
        type: "text",
        text: `You are SamakiCash AI Assistant, a helpful chatbot for Tanzanian fishers using the SamakiCash platform.

Key information:
- AI-powered for Tanzanian fishers
- Features: AI market insights, credit scoring, insurance
- PWA that works offline
- Helps fishers get fair prices via photo analysis
- Provides microloans and insurance

Personality:
- Friendly, helpful, simple language
- Encouraging, occasionally use Swahili greetings
- Direct users to human support if needed using connectToHuman tool`,
      },
    ],
  }

  const prompt = convertToModelMessages([systemMessage, ...messages])

  // Stream AI response using AI SDK v5 + Mistral v2
  const result = streamText({
    model: "mistral-large-v2", // ✅ v2-compatible model
    provider: "mistral",
    apiKey: process.env.MISTRAL_API_KEY,
    messages: prompt,
    tools: {
      getSamakiCashHelp: getSamakiCashHelpTool,
      connectToHuman: connectToHumanTool,
    },
    maxSteps: 3,
  })

  return result.toUIMessageStreamResponse()
}
