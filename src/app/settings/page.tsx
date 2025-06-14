// src/app/settings/page.tsx
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings as SettingsIcon, UserCircle, Bell, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your account, preferences, and application settings."
        icon={SettingsIcon}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-20"> {/* Make settings navigation sticky if needed */}
            <CardHeader>
              <CardTitle className="font-headline">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-muted/50">
                <UserCircle className="mr-2 h-5 w-5" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-muted/50">
                <Bell className="mr-2 h-5 w-5" /> Notifications
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-muted/50">
                <Palette className="mr-2 h-5 w-5" /> Appearance
              </Button>
               <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-muted/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Security
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profile Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Teacher Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="teacher@example.com" />
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications" className="font-normal">Email notifications for new assignments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="appNotifications" />
                <Label htmlFor="appNotifications" className="font-normal">In-app notifications for student progress</Label>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Theme selection (Light/Dark/System) will be available here.</p>
              <Button variant="outline">Toggle Dark Mode (Placeholder)</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
