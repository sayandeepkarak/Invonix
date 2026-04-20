"use client";

import { LayoutApp } from "@/components/layout/LayoutApp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfile } from "@/features/settings/components/SettingsProfile";
import { SettingsSecurity } from "@/features/settings/components/SettingsSecurity";
import { User, Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export default function SettingsPage() {
  return (
    <LayoutApp>
      <div className="space-y-6">
        <PageHeader
          title="Settings"
          subtitle="Manage your account preferences and security."
        />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl w-full sm:w-auto overflow-x-auto justify-start h-auto gap-1">
            <TabsTrigger
              value="profile"
              className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2"
            >
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2"
            >
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <div>
            <TabsContent value="profile" className="mt-0 outline-none">
              <SettingsProfile />
            </TabsContent>
            <TabsContent value="security" className="mt-0 outline-none">
              <SettingsSecurity />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </LayoutApp>
  );
}
