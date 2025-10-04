"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Fish,
  TrendingUp,
  Shield,
  CreditCard,
  BarChart3,
  Smartphone,
  Wifi,
  Bell,
  Users,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
export function generateViewport() {
  return {
    themeColor: "#38bdf8",
    inlineSize: "device-width",
    initialScale: 1,
  };
}

function AnimatedFeatureCard({ feature, index }: { feature: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <feature.icon
              className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
            />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default function FeaturesPage() {
  const features = [
    {
      icon: Fish,
      title: "Smart Catch Logging",
      description:
        "Easily record your daily catch with our intuitive mobile interface. Track species, quantities, and locations.",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      title: "AI Market Analysis",
      description: "Get real-time market insights and price predictions powered by advanced AI algorithms.",
      color: "text-secondary",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Comprehensive dashboards showing your fishing patterns, seasonal trends, and income optimization.",
      color: "text-primary",
    },
    {
      icon: CreditCard,
      title: "Micro-Credit Access",
      description: "Build your credit score and access tailored financial products designed for fishers.",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Insurance Protection",
      description: "Protect your equipment and livelihood with affordable insurance plans for fishers.",
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Location Tracking",
      description: "Mark your best fishing spots and share location data with trusted community members.",
      color: "text-secondary",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for mobile devices with offline capabilities for remote fishing locations.",
      color: "text-primary",
    },
    {
      icon: Wifi,
      title: "Offline Mode",
      description: "Continue logging catches even without internet connection. Data syncs when you're back online.",
      color: "text-secondary",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for optimal fishing conditions, market price changes, and payment reminders.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with other fishers, share insights, and build a supportive fishing community.",
      color: "text-secondary",
    },
    {
      icon: Calendar,
      title: "Planning Tools",
      description: "Plan your fishing trips with weather forecasts, tide information, and seasonal insights.",
      color: "text-primary",
    },
    {
      icon: DollarSign,
      title: "Income Optimization",
      description: "Maximize your earnings with data-driven recommendations on when and where to sell.",
      color: "text-secondary",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <img
              src="/tanzanian-fishers-working-with-modern-technology-o.jpg"
              alt="Fishers using technology"
              className="w-full h-full object-cover opacity-10 rounded-3xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance animate-fade-in">
            Powerful Features for Modern Fishers
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-delay">
            Discover how SamakiCash combines cutting-edge technology with deep understanding of the fishing industry to
            help you succeed.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Ready to Transform Your Fishing Business?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of fishers who are already using SamakiCash to increase their income and build sustainable
              fishing businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-300">
                <Link href="/register">Start Free Trial</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
