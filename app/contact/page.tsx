"use client"

import Link from "next/link"
import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageSquare, Users, Headphones } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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

function AnimatedContactCard({ method, index }: { method: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <method.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors duration-300">
                {method.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
              <p className="text-sm font-medium">{method.contact}</p>
              <p className="text-xs text-muted-foreground">{method.availability}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnimatedFAQCard({ faq, index }: { faq: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="group border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 bg-white/80 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
            {faq.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {faq.answer}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@samakicash.com",
      availability: "24/7 response within 2 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+255 123 456 789",
      availability: "Mon-Fri, 8AM-6PM EAT",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant messaging support",
      contact: "Available in app",
      availability: "Mon-Fri, 8AM-8PM EAT",
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "Dar es Salaam, Tanzania",
      availability: "Mon-Fri, 9AM-5PM EAT",
    },
  ]

  const faqs = [
    {
      question: "How do I get started with SamakiCash?",
      answer:
        "Simply download our app and create an account. You can start logging your catches immediately and access basic features for free.",
    },
    {
      question: "Is there a cost to use SamakiCash?",
      answer:
        "We offer a free tier with basic features. Premium features like advanced analytics and credit services have affordable monthly plans.",
    },
    {
      question: "How does the credit scoring work?",
      answer:
        "Our AI analyzes your fishing patterns, income consistency, and community reputation to build a credit profile tailored for fishers.",
    },
    {
      question: "Can I use the app offline?",
      answer:
        "Yes! You can log catches and access key features offline. Data syncs automatically when you reconnect to the internet.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <img
              src="/placeholder.svg?height=400&width=800&text=Contact+Support+Team"
              alt="Contact support team"
              className="w-full h-full object-cover opacity-10 rounded-3xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Have questions about SamakiCash? Need support? Want to partner with us? We're here to help and would love to
            hear from you.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-2" delay={200}>
            <Card className="group border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-primary group-hover:text-primary/80 transition-colors duration-300">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="transition-all duration-300 focus:scale-[1.02] hover:border-primary/30"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="transition-all duration-300 focus:scale-[1.02] hover:border-primary/30"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+255 123 456 789"
                        className="transition-all duration-300 focus:scale-[1.02] hover:border-primary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}>
                        <SelectTrigger className="transition-all duration-300 hover:border-primary/30">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief description of your inquiry"
                      className="transition-all duration-300 focus:scale-[1.02] hover:border-primary/30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about how we can help you..."
                      rows={6}
                      className="transition-all duration-300 focus:scale-[1.02] hover:border-primary/30"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full hover:scale-105 transition-transform duration-300">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Contact Methods */}
          <AnimatedSection className="space-y-6" delay={400}>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Contact Methods</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <AnimatedContactCard key={index} method={method} index={index} />
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <Card className="group border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <a href="#" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Join Community</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <a href="#" className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4" />
                    <span>Help Center</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:scale-105 transition-transform duration-300"
                  asChild
                >
                  <a href="/features" className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Feature Requests</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* FAQ Section */}
        <AnimatedSection className="mb-20" delay={600}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Quick answers to common questions about SamakiCash</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <AnimatedFAQCard key={index} faq={faq} index={index} />
            ))}
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection
          className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 relative overflow-hidden"
          delay={800}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't wait - join thousands of fishers who are already transforming their businesses with SamakiCash.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-300">
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
