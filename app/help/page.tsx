"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Video,
  FileText,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { useState } from "react"

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="border-primary/10 hover:border-primary/20 transition-colors">
      <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{question}</CardTitle>
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </CardContent>
      )}
    </Card>
  )
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using SamakiCash",
      articles: 12,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageCircle,
      title: "AI Market Insights",
      description: "Understanding price recommendations",
      articles: 8,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FileText,
      title: "Financial Services",
      description: "Credit scores, loans, and insurance",
      articles: 15,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      articles: 6,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const faqs = [
    {
      question: "How does the AI price recommendation work?",
      answer:
        "Our AI analyzes your fish photos using computer vision to identify species, size, and quality. It then compares this data with current market prices, seasonal trends, and local demand to provide accurate pricing recommendations.",
    },
    {
      question: "Is my data secure on SamakiCash?",
      answer:
        "Yes, we use bank-level encryption to protect your data. All photos and personal information are stored securely and never shared with third parties without your explicit consent.",
    },
    {
      question: "How can I improve my credit score?",
      answer:
        "Regular use of the app, accurate catch reporting, timely loan repayments, and maintaining consistent fishing activity all contribute to improving your credit score on our platform.",
    },
    {
      question: "Can I use the app offline?",
      answer:
        "Yes! SamakiCash is a Progressive Web App (PWA) that works offline. You can log catches, view previous data, and access basic features without internet connection. Data syncs when you're back online.",
    },
    {
      question: "What types of insurance are available?",
      answer:
        "We offer boat insurance, equipment insurance, catch insurance, and personal accident insurance specifically designed for fishers. Coverage varies based on your location and fishing activities.",
    },
  ]

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our AI assistant or connect to human support",
      action: "Start Chat",
      available: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+255 123 456 789",
      action: "Call Now",
      available: "Mon-Fri 8AM-6PM",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@samakicash.com",
      action: "Send Email",
      available: "Response within 24h",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers, get support, and learn how to make the most of SamakiCash
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg border-primary/20 focus:border-primary/40"
            />
          </div>
        </AnimatedSection>

        {/* Quick Stats */}
        <AnimatedSection className="mb-16" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-primary/10">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Satisfaction</div>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/10">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary mb-1">&lt; 2 min</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </CardContent>
            </Card>
            <Card className="text-center border-primary/10">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Help Categories */}
        <AnimatedSection className="mb-16" delay={400}>
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 hover:border-primary/20 cursor-pointer"
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="text-xs">
                    {category.articles} articles
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact Methods */}
        <AnimatedSection className="mb-16" delay={600}>
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-primary/10 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription className="mb-2">{method.description}</CardDescription>
                  <Badge variant="outline" className="text-xs">
                    {method.available}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{method.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection delay={800}>
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  )
}
