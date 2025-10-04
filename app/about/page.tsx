import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Heart, Users, Award } from "lucide-react"
import Link from "next/link"
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

function AnimatedValueCard({ value, index }: { value: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="group border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-white/80 backdrop-blur-sm h-full">
        <CardHeader>
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <value.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
            {value.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
            {value.description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Fisher-First Approach",
      description:
        "Every feature we build is designed with the real needs of fishers in mind, based on extensive community feedback.",
    },
    {
      icon: Target,
      title: "Data-Driven Insights",
      description:
        "We leverage advanced AI and machine learning to provide actionable insights that help fishers make better decisions.",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "We believe in the power of community and work to connect fishers across Tanzania and beyond.",
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description:
        "We're committed to providing reliable, high-quality tools that fishers can depend on for their livelihoods.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Active Fishers" },
    { number: "50M+", label: "Fish Logged" },
    { number: "95%", label: "User Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <AnimatedSection className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <img
              src="/tanzanian-coastal-fishing-village-with-traditional.jpg"
              alt="Fishing community"
              className="w-full h-full object-cover opacity-10 rounded-3xl"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
            Empowering Fishers Through Technology
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            SamakiCash was born from a simple belief: that technology should serve those who feed our communities. We're
            building the future of sustainable fishing in Tanzania.
          </p>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" delay={200}>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To democratize access to financial services and market intelligence for fishers across Tanzania, helping
              them build sustainable and profitable fishing businesses while preserving our marine ecosystems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We combine deep local knowledge with cutting-edge technology to create solutions that truly understand the
              unique challenges and opportunities in the fishing industry.
            </p>
          </div>
          <div className="relative group">
            <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src="/modern-fishing-technology-dashboard-on-tablet-with.jpg"
                alt="SamakiCash technology"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Values Section */}
        <AnimatedSection className="mb-20" delay={400}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at SamakiCash
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 mb-20 relative overflow-hidden"
          delay={600}
        >
          <div className="absolute inset-0 opacity-5">
            <img src="/abstract-pattern-of-fish-and-waves-in-blue-and-gre.jpg" alt="Background pattern" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground">Real numbers from our growing community of fishers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Story Section */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" delay={800}>
          <div className="relative group">
            <div className="w-full h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src="/team-of-diverse-technologists-and-fishers-working-.jpg"
                alt="SamakiCash team"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Founded in 2024 by a team of technologists and fishing industry experts, SamakiCash emerged from countless
              conversations with fishers along Tanzania's coast. We saw firsthand how traditional fishing communities
              were being left behind by the digital revolution.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we're proud to be the leading platform connecting fishers with the tools, insights, and financial
              services they need to thrive in the modern economy while honoring traditional fishing practices.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection
          className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 relative overflow-hidden"
          delay={1000}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-primary mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a fisher looking to grow your business or someone who shares our vision for sustainable
              fishing, we'd love to have you join our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform duration-300">
                <Link href="/register">Get Started Today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
