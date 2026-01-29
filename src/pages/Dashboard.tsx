import DashboardLayout from '@/layouts/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Dashboard content placeholder (layout only) */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-muted-foreground mt-2">Your dashboard content will appear here.</p>
      </div>
    </DashboardLayout>
  );
}
