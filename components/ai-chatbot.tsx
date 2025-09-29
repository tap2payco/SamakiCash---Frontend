"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Phone, X, Settings } from "lucide-react"

interface AIChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(false)
  const [voiceLanguage, setVoiceLanguage] = useState("en-US")
  const [showSettings, setShowSettings] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Habari! Welcome to SamakiCash support. I'm here to help you with anything about our platform. How can I assist you today?",
          },
        ],
      },
    ],
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (autoSpeak && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "assistant" && lastMessage.id !== "welcome") {
        const textPart = lastMessage.parts.find((part) => part.type === "text")
        if (textPart && "text" in textPart) {
          setTimeout(() => speakMessage(textPart.text), 500)
        }
      }
    }
  }, [messages, autoSpeak])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && status !== "in_progress") {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = voiceLanguage

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        let transcript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setInput(transcript)

        if (event.results[event.results.length - 1].isFinal) {
          setTimeout(() => {
            if (transcript.trim()) {
              sendMessage({ text: transcript })
              setInput("")
            }
          }, 500)
        }
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      utterance.lang = voiceLanguage

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const quickActions = [
    "How do I upload fish photos?",
    "Check my credit score",
    "Get insurance quote",
    "How does offline mode work?",
    "Connect to human support",
  ]

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "sw-TZ", name: "Swahili (Tanzania)" },
    { code: "en-GB", name: "English (UK)" },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <CardTitle className="text-lg">SamakiCash AI Assistant</CardTitle>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/80">{status === "in_progress" ? "Typing..." : "Online"}</p>
                  {isListening && (
                    <Badge variant="secondary" className="text-xs bg-red-500 text-white">
                      Listening
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge variant="secondary" className="text-xs bg-green-500 text-white">
                      Speaking
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                title="Voice settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("tel:+255123456789")}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                title="Call human support"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {showSettings && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-speak responses</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`h-6 px-2 text-xs ${autoSpeak ? "bg-white/20" : ""}`}
                  >
                    {autoSpeak ? "ON" : "OFF"}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <select
                    value={voiceLanguage}
                    onChange={(e) => setVoiceLanguage(e.target.value)}
                    className="bg-white/20 text-white text-xs rounded px-2 py-1 border-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code} className="text-black">
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <div key={index} className="flex items-start gap-2">
                            <p className="text-sm leading-relaxed flex-1">{part.text}</p>
                            {message.role === "assistant" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => (isSpeaking ? stopSpeaking() : speakMessage(part.text))}
                                className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                              >
                                {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                              </Button>
                            )}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    sendMessage({ text: action })
                  }}
                  className="text-xs h-7"
                  disabled={status === "in_progress"}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Type or speak your message..."}
                disabled={status === "in_progress"}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={status === "in_progress"}
                className={`px-3 ${isListening ? "bg-red-50 border-red-200" : ""}`}
              >
                {isListening ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button type="submit" disabled={!input.trim() || status === "in_progress"} className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Click the mic to speak, or type your message. {autoSpeak && "Auto-speak is enabled."}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
