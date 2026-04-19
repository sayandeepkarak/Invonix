import { AppLayout } from "@/components/layout/AppLayout"
export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <h1 className="text-4xl font-bold text-muted-foreground italic">Hello Dashboard!</h1>
      </div>
    </AppLayout>
  )
}
