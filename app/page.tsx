"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthManager } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fish, TrendingUp, Shield, Smartphone, ArrowRight, Star, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
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

function AnimatedFeatureCard({ feature, index }: { feature: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <Card className="group text-center border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 bg-white/90 backdrop-blur-sm h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <CardHeader className="relative z-10 p-4 sm:p-6">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary/10 border border-primary/10`}
          >
            <feature.icon
              className={`w-8 h-8 sm:w-10 sm:h-10 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
            />
          </div>
          <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300 mb-2 sm:mb-3">
            {feature.title}
          </CardTitle>
          <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300 text-sm sm:text-base leading-relaxed">
            {feature.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 p-4 sm:p-6 pt-0">
          <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-relaxed">
            {feature.details}
          </p>
          <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs sm:text-sm">
              Learn More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    if (AuthManager.isAuthenticated()) {
      router.push("/dashboard")
    }
  }, [router])

  const features = [
    {
      icon: TrendingUp,
      title: "AI Market Insights",
      description: "Smart price recommendations for your catch",
      details:
        "Upload photos of your fish and receive instant market analysis with fair pricing suggestions powered by advanced AI.",
      gradient: "from-primary/20 to-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Shield,
      title: "Financial Services",
      description: "Credit scores, loans, and insurance",
      details:
        "Build your credit history and access financial products specifically designed for fishers and marine professionals.",
      gradient: "from-secondary/20 to-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Smartphone,
      title: "Mobile-First PWA",
      description: "Works offline and installs like a native app",
      details:
        "Progressive web app that functions perfectly even with poor internet connectivity and can be installed on any device.",
      gradient: "from-accent/20 to-accent/10",
      iconColor: "text-accent",
    },
  ]

  const stats = [
    { icon: Users, number: "10,000+", label: "Active Fishers" },
    { icon: Fish, number: "50M+", label: "Fish Logged" },
    { icon: BarChart3, number: "95%", label: "User Satisfaction" },
    { icon: Star, number: "4.9", label: "App Rating" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navigation />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 relative" id="hero">
          <div className="absolute inset-0 -z-10">
            <img
              src="/tanzanian-fishers-working-with-modern-technology-o.jpg"
              alt="Tanzanian fishers using modern technology"
              className="w-full h-full object-cover opacity-10 rounded-3xl"
            />
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-float shadow-lg shadow-primary/20">
              <Fish className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-balance animate-fade-in px-2">
            <span className="gradient-text">Welcome to SamakiCash</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-3xl mx-auto animate-fade-in-delay leading-relaxed px-4">
            Empowering Tanzanian fishers with AI-powered market insights and comprehensive financial services
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-slide-up px-4">
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
            >
              <Link href="/login" className="flex items-center gap-2">
                Sign In <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
            >
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <AnimatedSection className="mb-12 sm:mb-16" delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Features Grid */}
        <AnimatedSection className="mb-12 sm:mb-16" delay={600} id="features">
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
              Powerful Features for Modern Fishers
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our cutting-edge technology helps you maximize your fishing business potential
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <AnimatedFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </AnimatedSection>

        {/* Install Prompt */}
        <AnimatedSection delay={800}>
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
            <CardContent className="pt-6 sm:pt-8 pb-6 sm:pb-8 relative z-10 px-4 sm:px-6">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-primary animate-bounce-gentle" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">Install SamakiCash PWA</h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-base sm:text-lg">
                  Add to your home screen for quick access, offline functionality, and a native app experience
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-white/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8"
                >
                  Install App
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
  )
}
