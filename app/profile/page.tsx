"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { BottomNav } from "@/components/bottom-nav"
import { User, Bell, Shield, LogOut, ArrowLeft, Edit, Save, X } from "lucide-react"
import { AuthManager } from "@/lib/auth"

export default function ProfilePage() {
  const [user, setUser] = useState(AuthManager.getUser())
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Fisher",
    email: user?.email || "",
    phone: "+255 123 456 789",
    location: "Mwanza, Tanzania",
    notifications: true,
    marketAlerts: true,
    weatherAlerts: false,
  })
  const [originalData, setOriginalData] = useState(formData)
  const router = useRouter()

  useEffect(() => {
    if (!AuthManager.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  const handleEdit = () => {
    setOriginalData(formData)
    setEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save to backend
    setEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setFormData(originalData)
    setEditing(false)
  }

  const handleLogout = () => {
    AuthManager.clearAuth()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Profile</h1>
                <p className="text-muted-foreground">Manage your account settings</p>
              </div>
            </div>
            {!editing && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                disabled={!editing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                disabled={!editing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                disabled={!editing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Primary Fishing Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                disabled={!editing}
              />
            </div>

            {editing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">General app notifications and updates</p>
              </div>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Market Price Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when fish prices change significantly</p>
              </div>
              <Switch
                checked={formData.marketAlerts}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, marketAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weather Alerts</p>
                <p className="text-sm text-muted-foreground">Receive weather warnings for your fishing area</p>
              </div>
              <Switch
                checked={formData.weatherAlerts}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, weatherAlerts: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your SamakiCash activity summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Catches Analyzed</div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-bold text-secondary">720</div>
                <div className="text-sm text-muted-foreground">Credit Score</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-sm text-muted-foreground">Months Active</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">TSh 54K</div>
                <div className="text-sm text-muted-foreground">Avg. Price/kg</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Privacy Settings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Download My Data
            </Button>
          </CardContent>
        </Card>

        {/* Support & Help */}
        <Card>
          <CardHeader>
            <CardTitle>Support & Help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Privacy Policy
            </Button>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>January 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Build:</span>
                <span>PWA-2024.1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card className="border-destructive/20">
          <CardContent className="pt-6">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
