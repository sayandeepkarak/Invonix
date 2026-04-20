"use client";

import { LayoutApp } from "@/components/layout/LayoutApp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfile } from "@/features/settings/components/SettingsProfile";
import { SettingsSecurity } from "@/features/settings/components/SettingsSecurity";
import { User, Shield } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const SETTINGS_TABS = [
  {
    value: "profile",
    label: "Profile",
    icon: User,
    component: SettingsProfile,
  },
  {
    value: "security",
    label: "Security",
    icon: Shield,
    component: SettingsSecurity,
  },
];

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
            {SETTINGS_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2"
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div>
            {SETTINGS_TABS.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="mt-0 outline-none"
              >
                <tab.component />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </LayoutApp>
  );
}
