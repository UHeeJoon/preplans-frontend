import { EnhancedAdminDashboard } from "@/components/enhanced-admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto" id="main-content">
        <EnhancedAdminDashboard />
      </main>
    </div>
  )
}
