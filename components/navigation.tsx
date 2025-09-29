"use client"

import { Fish, Menu, X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { InstallPWAButton } from "./install-pwa-button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <InstallPWAButton />
        </div>

        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Fish className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">SamakiCash</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/features"
              className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              Contact
            </Link>
            <Link
              href="/help"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm lg:text-base"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary/10">
            <div className="flex flex-col space-y-4">
              <Link
                href="/features"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/help"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-primary/10">
                <Button asChild variant="ghost" className="justify-start" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="justify-start" size="sm">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
