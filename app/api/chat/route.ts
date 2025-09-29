import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

const mistral = (model: string) => ({
  provider: "mistral",
  modelId: model,
  settings: {
    apiKey: "4DIT4Ghrc4L1eFcLhwDljSyAzU34a5lo",
    baseURL: "https://api.mistral.ai/v1",
  },
})

const getSamakiCashHelpTool = tool({
  description: "Get help information about SamakiCash features and services",
  inputSchema: z.object({
    topic: z.string().describe("The topic the user needs help with"),
  }),
  execute: async ({ topic }) => {
    // Simulate knowledge base lookup
    const helpTopics: Record<string, string> = {
      "upload fish photos":
        'To upload fish photos: 1) Go to Dashboard, 2) Click "Add Catch", 3) Take or select photo, 4) Our AI will analyze and provide price recommendations.',
      "credit score":
        "Your credit score is calculated based on: fishing activity consistency, loan repayment history, catch reporting accuracy, and platform engagement. Check your score in the Credit section.",
      insurance:
        "We offer boat insurance, equipment insurance, catch insurance, and personal accident insurance. Get quotes in the Insurance section based on your fishing activities.",
      "offline mode":
        "SamakiCash works offline! You can log catches, view previous data, and access basic features without internet. Data syncs when you reconnect.",
      pricing:
        "Our AI analyzes your fish photos to identify species, size, and quality, then provides market-based pricing recommendations using current local market data.",
      loans:
        "Access microloans based on your credit score and fishing history. Apply in the Credit section with competitive rates for fishers.",
    }

    const lowerTopic = topic.toLowerCase()
    for (const [key, value] of Object.entries(helpTopics)) {
      if (lowerTopic.includes(key)) {
        return value
      }
    }

    return "I can help you with uploading fish photos, checking credit scores, getting insurance quotes, using offline mode, understanding pricing, and applying for loans. What specific topic would you like to know more about?"
  },
})

const connectToHumanTool = tool({
  description: "Connect the user to human support when they need personalized assistance",
  inputSchema: z.object({
    reason: z.string().describe("Why the user needs human support"),
  }),
  execute: async ({ reason }) => {
    return `I'm connecting you to our human support team for: ${reason}. Please wait while I transfer you to an available agent. You can also call +255 123 456 789 or email support@samakicash.com for immediate assistance.`
  },
})

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemMessage = {
    role: "system" as const,
    content: `You are SamakiCash AI Assistant, a helpful chatbot for Tanzanian fishers using the SamakiCash platform. 

Key information about SamakiCash:
- AI-powered platform for fishers in Tanzania
- Features: AI market insights, credit scoring, insurance, financial services
- Progressive Web App (PWA) that works offline
- Helps fishers get fair prices for their catch through photo analysis
- Provides microloans and insurance specifically for fishers

Your personality:
- Friendly, helpful, and knowledgeable about fishing and technology
- Use simple, clear language
- Be encouraging and supportive
- Understand the challenges fishers face
- Occasionally use Swahili greetings like "Habari" or "Karibu"

Always try to help users with their questions about the platform. If you can't answer something or they need personalized help, use the connectToHuman tool.`,
  }

  const prompt = convertToModelMessages([systemMessage, ...messages])

  const result = streamText({
    model: mistral("mistral-large-latest"),
    messages: prompt,
    tools: {
      getSamakiCashHelp: getSamakiCashHelpTool,
      connectToHuman: connectToHumanTool,
    },
    maxSteps: 3,
  })

  return result.toUIMessageStreamResponse()
}
